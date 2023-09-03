const express = require('express');
const app = express();

const puppeteer = require('puppeteer-core');
const { SRC_ROOT, UTILS_ROOT } = require('../../config.js');
const { newChat, appendChat } = require('../../utils/chatHistory.js');

var assert = require('chai').assert;

require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;

const { TASK_DESCRIPTION, helloworld_louis_paragraph } = require('./prompt');
// const { checkLoginState } = require('../../utils/chatGPT.js');

const {
  helloworld,
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  checkLoginState,
} = require(`${UTILS_ROOT}/chatGPT`);

const port = 3000;

app.get('/chatgpt_summarize_helloworld', async (req, res) => {
  const CHAT_SESSION = '1';

  var answer_idx = -1;

  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,
    executablePath: '/usr/bin/firefox',
    userDataDir: FIREFOX_DATA_DIR,
 //   slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  try {
    await initChatGptPage(page);
    await checkLoginState(page);

    await clearChatHistory(page);
    await clearModalBox(page);

    var session_id = await newChat();
    var chat_history = { session_id, history: [] };

    var question1 = TASK_DESCRIPTION();
    var question2 = helloworld_louis_paragraph();
    // var question3 = "say 'hello 3' to me";

    var question_list = [question1, question2];

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      chat_history.history.push({ question, answer });
    }

    res.send({ state: 'helloworld done', chat_history });
  } catch (error) {
    res.send({ state: 'helloworld error', error });
    throw error;
  } finally {
    await page.close();
    await browser.close();
  }
});

app.get('/helloworld', (req, res) => {
  res.send('Hello World! from src/openbox-firefox/src/tests/express/chatgpt_summarize_helloworld.js');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
