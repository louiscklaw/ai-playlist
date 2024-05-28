package coze

import (
	"errors"
	"fmt"
	"github.com/bincooo/chatgpt-adapter/v2/internal/common"
	"github.com/bincooo/chatgpt-adapter/v2/internal/middle"
	"github.com/bincooo/chatgpt-adapter/v2/pkg/gpt"
	"github.com/bincooo/coze-api"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
	"net/http"
	"strings"
	"time"
)

const MODEL = "coze"

var (
	// 35-16k
	botId35_16k   = "7353052833752694791"
	version35_16k = "1712016747307"
	scene35_16k   = 2

	// 8k
	botId8k   = "7353047124357365778"
	version8k = "1712645567468"
	scene8k   = 2

	// 128k
	botId128k   = "7353048532129644562"
	version128k = "1712016880672"
	scene128k   = 2

	blocks = []string{
		"<|system|>",
		"<|user|>",
		"<|assistant|>",
		"<|function|>",
		"<|end|>",
	}
)

func Complete(ctx *gin.Context, req gpt.ChatCompletionRequest, matchers []common.Matcher) {
	var (
		cookie   = ctx.GetString("token")
		proxies  = ctx.GetString("proxies")
		notebook = ctx.GetBool("notebook")
	)

	messages := req.Messages
	messageL := len(messages)
	if messageL == 0 {
		middle.ResponseWithV(ctx, -1, "[] is too short - 'messages'")
		return
	}

	if messages[messageL-1]["role"] != "function" && len(req.Tools) > 0 {
		goOn, e := completeToolCalls(ctx, cookie, proxies, req)
		if e != nil {
			errMessage := e.Error()
			if strings.Contains(errMessage, "Login verification is invalid") {
				middle.ResponseWithV(ctx, http.StatusUnauthorized, errMessage)
			}
			middle.ResponseWithV(ctx, -1, errMessage)
			return
		}
		if !goOn {
			return
		}
	}

	pMessages, tokens, err := buildConversation(messages)
	if err != nil {
		middle.ResponseWithE(ctx, -1, err)
		return
	}

	ctx.Set("tokens", tokens)
	options := newOptions(proxies, pMessages)
	co, msToken := extCookie(cookie)
	chat := coze.New(co, msToken, options)

	query := ""
	if notebook && len(pMessages) > 0 {
		// notebook 模式只取第一条 content
		query = pMessages[0].Content
	} else {
		query = coze.MergeMessages(pMessages)
	}

	chatResponse, err := chat.Reply(ctx.Request.Context(), query)
	if err != nil {
		middle.ResponseWithE(ctx, -1, err)
		return
	}

	// 自定义标记块中断
	cancel, matcher := common.NewCancelMather()
	matchers = append(matchers, matcher)

	waitResponse(ctx, matchers, cancel, chatResponse, req.Stream)
}

func extCookie(co string) (cookie, msToken string) {
	cookie = co
	index := strings.Index(cookie, "[msToken=")
	if index > -1 {
		end := strings.Index(cookie[index:], "]")
		if end > -1 {
			msToken = cookie[index+6 : index+end]
			cookie = cookie[:index] + cookie[index+end+1:]
		}
	}
	return
}

func Generation(ctx *gin.Context, req gpt.ChatGenerationRequest) {
	var (
		cookie  = ctx.GetString("token")
		proxies = ctx.GetString("proxies")
	)

	// 只绘画用3.5 16k即可
	options := coze.NewDefaultOptions(botId35_16k, version35_16k, scene35_16k, proxies)
	co, msToken := extCookie(cookie)
	chat := coze.New(co, msToken, options)
	image, err := chat.Images(ctx.Request.Context(), req.Prompt)
	if err != nil {
		middle.ResponseWithE(ctx, -1, err)
		return
	}

	if (req.Size == "HD" || strings.HasPrefix(req.Size, "1792x")) && common.HasMfy() {
		v, e := common.Magnify(ctx, image)
		if e != nil {
			logrus.Error(e)
		} else {
			image = v
		}
	}

	ctx.JSON(http.StatusOK, gin.H{
		"created": time.Now().Unix(),
		"styles:": make([]string, 0),
		"data": []map[string]string{
			{"url": image},
		},
	})
}

func newOptions(proxies string, pMessages []coze.Message) (options coze.Options) {
	opts8k := coze.NewDefaultOptions(botId8k, version8k, scene8k, proxies)
	opts128k := coze.NewDefaultOptions(botId128k, version128k, scene128k, proxies)

	options = opts8k
	tokensL := calcTokens(pMessages)
	if tokensL > 7000 { // 大于7k token 使用 gpt-128k
		options = opts128k
	}
	return
}

func calcTokens(messages []coze.Message) (tokensL int) {
	for _, message := range messages {
		tokensL += common.CalcTokens(message.Content)
	}
	return
}

func waitMessage(chatResponse chan string) (content string, err error) {

	for {
		message, ok := <-chatResponse
		if !ok {
			break
		}

		if strings.HasPrefix(message, "error: ") {
			return "", errors.New(strings.TrimPrefix(message, "error: "))
		}

		message = strings.TrimPrefix(message, "text: ")
		if len(message) > 0 {
			content += message
		}
	}

	return content, nil
}

func waitResponse(ctx *gin.Context, matchers []common.Matcher, cancel chan error, chatResponse chan string, sse bool) {
	content := ""
	created := time.Now().Unix()
	logrus.Infof("waitResponse ...")
	tokens := ctx.GetInt("tokens")

	for {
		select {
		case err := <-cancel:
			if err != nil {
				middle.ResponseWithE(ctx, -1, err)
				return
			}
			goto label
		default:
			raw, ok := <-chatResponse
			if !ok {
				goto label
			}

			if strings.HasPrefix(raw, "error: ") {
				middle.ResponseWithV(ctx, -1, strings.TrimPrefix(raw, "error: "))
				return
			}

			raw = strings.TrimPrefix(raw, "text: ")
			contentL := len(raw)
			if contentL <= 0 {
				continue
			}

			fmt.Printf("----- raw -----\n %s\n", raw)
			raw = common.ExecMatchers(matchers, raw)
			if sse {
				middle.ResponseWithSSE(ctx, MODEL, raw, nil, created)
			}
			content += raw
		}
	}

label:
	if !sse {
		middle.ResponseWith(ctx, MODEL, content)
	} else {
		middle.ResponseWithSSE(ctx, MODEL, "[DONE]", common.CalcUsageTokens(content, tokens), created)
	}
}

func buildConversation(messages []map[string]string) (pMessages []coze.Message, tokens int, err error) {
	var prompt string
	pos := len(messages) - 1
	if pos < 0 {
		return
	}

	if messages[pos]["role"] == "function" {
		prompt = "继续输出"
		if pos-1 >= 0 { // 获取上一条记录
			if msg := messages[pos-1]; msg["role"] == "user" {
				prompt = msg["content"]
			}
		}
	} else if messages[pos]["role"] != "user" {
		c := []rune(messages[pos]["content"])
		if contentL := len(c); contentL > 10 {
			prompt = fmt.Sprintf("从`%s`断点处继续写", string(c[contentL-10:]))
		} else {
			prompt = "继续输出"
		}
	}

	if len(prompt) > 0 {
		messages = append(messages, map[string]string{
			"role":    "user",
			"content": prompt,
		})
	}

	pos = 0
	messageL := len(messages)

	role := ""
	buffer := make([]string, 0)

	condition := func(expr string) string {
		switch expr {
		case "system", "user", "function", "assistant":
			return expr
		default:
			return ""
		}
	}

	for {
		if pos >= messageL {
			if len(buffer) > 0 {
				tokens += common.CalcTokens(strings.Join(buffer, ""))
				pMessages = append(pMessages, coze.Message{
					Role:    role,
					Content: strings.Join(buffer, "\n\n"),
				})
			}
			break
		}

		message := messages[pos]
		curr := condition(message["role"])
		content := message["content"]
		if curr == "" {
			return nil, -1, errors.New(
				fmt.Sprintf("'%s' is not one of ['system', 'assistant', 'user', 'function'] - 'messages.%d.role'",
					message["role"], pos))
		}

		pos++
		if role == "" {
			role = curr
		}

		if curr == "function" {
			content = fmt.Sprintf("这是系统内置tools工具的返回结果: (%s)\n\n##\n%s\n##", message["name"], content)
		}

		if curr == role {
			buffer = append(buffer, content)
			continue
		}

		tokens += common.CalcTokens(strings.Join(buffer, ""))
		pMessages = append(pMessages, coze.Message{
			Role:    role,
			Content: strings.Join(buffer, "\n\n"),
		})
		buffer = append(make([]string, 0), content)
		role = curr
	}

	return pMessages, tokens, nil
}
