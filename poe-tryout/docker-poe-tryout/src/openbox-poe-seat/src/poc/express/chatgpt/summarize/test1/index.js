const express = require('express');
const app = express();
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
const { TASK_DESCRIPTION, helloworld_louis_paragraph } = require('../prompt');

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

    var q_and_a = [];
    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      q_and_a.push({ question, answer });
    }

    res.send({ state: 'helloworld done', chat_history: { q_and_a } });
  } catch (error) {
    res.send({ state: 'helloworld error', error });
    throw error;
  } finally {
    await page.close();
    await browser.close();
  }
});

app.get('/helloworld', (req, res) => {
  res.send('Hello World! from express-helloworld.js');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
