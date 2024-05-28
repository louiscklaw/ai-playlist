package common

import (
	"bytes"
	"strings"
)

func MessageCombiner[T any](
	messages []map[string]string,
	iter func(previous, next string, message map[string]string, buffer *bytes.Buffer) []T,
) (newMessages []T) {

	previous := "start"
	buffer := new(bytes.Buffer)
	msgs := make([]map[string]string, 0)
	for _, message := range messages {
		str := strings.TrimSpace(message["content"])
		if str == "" {
			continue
		}

		if buffer.Len() != 0 {
			buffer.WriteString("\n\n")
		}

		if previous == "start" {
			previous = message["role"]
			buffer.WriteString(str)
			continue
		}

		if previous == message["role"] {
			buffer.WriteString(str)
			continue
		}

		msgs = append(msgs, map[string]string{
			"role":    previous,
			"content": buffer.String(),
		})

		buffer.Reset()
		previous = message["role"]
		buffer.WriteString(str)
	}

	if buffer.Len() > 0 {
		msgs = append(msgs, map[string]string{
			"role":    previous,
			"content": buffer.String(),
		})
	}

	buffer = new(bytes.Buffer)
	messageL := len(msgs)
	previous = "start"
	for idx, message := range msgs {
		next := "end"
		if idx+1 < messageL-1 {
			next = msgs[idx+1]["role"]
		}

		nextMessages := iter(previous, next, message, buffer)
		if len(next) > 0 {
			newMessages = append(newMessages, nextMessages...)
		}

		previous = message["role"]
	}
	return
}

func StringCombiner[T any](messages []T, iter func(message T) string) string {
	buffer := new(bytes.Buffer)
	for _, message := range messages {
		str := iter(message)
		buffer.WriteString(str)
	}
	return buffer.String()
}
