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

app.post('/chatgpt_role_play_helloworld', async (req, res) => {
  var chat_history = 'hello chat history';

  try {
    res.send({ state: 'helloworld done', chat_history });
  } catch (error) {
    res.send({ state: 'helloworld error', error });
    throw error;
  } finally {
    // await page.close();
    // await browser.close();
  }
});

app.get('/helloworld', (req, res) => {
  res.send('Hello World! from express-helloworld.js');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
