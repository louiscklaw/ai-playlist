const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// NOTE: original use puppeteer core only
// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();
const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

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

const NO_QUESTION_FOUND = 'no question found';
const QUESTION_LIST_NOT_FOUND = 'question list not found';

async function solverHelloworld(question_list, jobs_id) {
  var chat_history = { session_id: jobs_id, history: [] };

  const CHAT_SESSION = '1';
  var answer_idx = -1;

  const browser = await puppeteer.launch({
    product: 'chrome',
    headless: false,
    executablePath: '/usr/bin/google-chrome-stable',
    userDataDir: CHROME_DATA_DIR,
 //   slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', `--user-data-dir=${CHROME_DATA_DIR}`],
  });
  const page = await browser.newPage();

  try {
    await initChatGptPage(page);
    await checkLoginState(page);

    await clearChatHistory(page);
    await clearModalBox(page);

    // var session_id = await newChat();

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      chat_history.history.push({ question, answer });
    }
  } catch (error) {
    // res.send({ state: 'helloworld error', error })
    throw error;
  } finally {
    await page.close();
    await browser.close();
  }

  return chat_history;
}

// NOTE: test using /workspace/ai-playlist/poe-tryout/docker-poe-tryout/src/openbox-firefox/src/tests/express/chatgpt/summarize/test2/curl.sh
app.post('/chatgpt_summarize_helloworld', async (req, res) => {
  var json_input = req.body;

  try {
    var { jobs_id, question_list } = json_input;
    // res.send(question_list)
    if (!question_list) throw new Error(QUESTION_LIST_NOT_FOUND);
    if (question_list?.length < 1) throw new Error(NO_QUESTION_FOUND);
    // NOTE: question list valid after this line

    var temp_history = await solverHelloworld(question_list, jobs_id);

    res.send({ state: 'helloworld done', json_input, chat_history: { q_and_a: temp_history } });
  } catch (error) {
    console.log(error);

    if (error.message == NO_QUESTION_FOUND) {
      res.send({ state: 'hello no question found' });
      return;
    }
    res.send({ state: 'unknown error', error_messge: error.message });
  } finally {
    // close something
  }
});

app.get('/helloworld', (req, res) => {
  res.send('Hello World! from src/openbox-firefox/src/tests/express/chatgpt/summarize/test2/index.js');
});

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });

var server = app.listen(port);
server.keepAliveTimeout = 60 * 1000;
