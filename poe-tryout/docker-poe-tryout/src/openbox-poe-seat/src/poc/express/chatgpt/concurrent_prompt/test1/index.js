const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const puppeteer = require('puppeteer-core');

require('dotenv').config();
const { FIREFOX_DATA_DIR } = process.env;

const { SRC_ROOT, UTILS_ROOT } = require('../../../../../config');
const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory`);

const {
  helloworld,
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  checkLoginState,
} = require(`${UTILS_ROOT}/chatGPT`);
// const { TASK_DESCRIPTION, helloworld_louis_paragraph } = require('../prompt');

const port = 3000;

const NO_QUESTION_FOUND = 'no question found';
const QUESTION_LIST_NOT_FOUND = 'question list not found';

var browser = {};
(async () => {
  browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,
    executablePath: '/usr/bin/firefox',
    userDataDir: FIREFOX_DATA_DIR,
    //   slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
  });
})();
console.log('browser init complete');

async function chatGPTSolver(question_list, browser) {
  var output = { state: 'init', debug: question_list, error: '' };
  var chat_history = { session_id, history: [] };

  const CHAT_SESSION = '1';
  var answer_idx = -1;

  const page = await browser.newPage();

  try {
    await initChatGptPage(page);
    await checkLoginState(page);

    await clearChatHistory(page);
    await clearModalBox(page);

    var session_id = await newChat();

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      chat_history.history.push({ question, answer });
    }
  } catch (error) {
    res.send({ state: 'error', error });
    throw error;
  } finally {
    await page.close();
  }

  return chat_history;
}

app.post('/chatgpt_role_play_helloworld', async (req, res) => {
  var json_input = req.body;

  try {
    var chat_history = {};
    var { question_list } = json_input;
    if (!question_list) throw new Error(QUESTION_LIST_NOT_FOUND);
    if (question_list?.length < 1) throw new Error(NO_QUESTION_FOUND);
    // NOTE: question list valid after this line

    var { pre_prompt } = json_input;
    if (pre_prompt?.length > 0) {
      console.log('pre-prompt found in input, processing...');
      var result = await chatGPTSolver(pre_prompt, browser);
      chat_history['pre_prompt_result'] = result;
    }

    var result = await chatGPTSolver(question_list, browser);
    chat_history['q_and_a'] = result;

    res.send({ state: 'helloworld done', json_input, chat_history });
  } catch (error) {
    if (error.message == NO_QUESTION_FOUND) {
      res.send({ state: NO_QUESTION_FOUND });
      return;
    }
    res.send({ state: 'error', error: JSON.stringify(error) });
  }
});

app.get('/helloworld', (req, res) => {
  res.send('Hello World! from express-helloworld.js');
});

try {
  var server = app.listen(port);
} catch (error) {
  console.log(error);
} finally {
  // browser.close();
}
