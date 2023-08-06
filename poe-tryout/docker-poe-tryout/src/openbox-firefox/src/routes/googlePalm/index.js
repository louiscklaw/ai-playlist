const express = require('express');
const router = express.Router();

const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

require('dotenv').config();
const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../../config');
const { googlePalmSolver } = require('../../worker/poe/googlePalm');
const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory`);

const {
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  helloworld,
  initGooglePaLMPage,
  questionAndAnswer,
  assertKeyWord,
} = require(`${UTILS_ROOT}/google-palm`);

router.post('/helloworld', async (req, res) => {

  var json_input = req.body;

  try {
    var { jobs_id, question_list } = json_input;
    // res.send(question_list)
    if (!question_list) throw new Error(QUESTION_LIST_NOT_FOUND);
    if (question_list?.length < 1) throw new Error(NO_QUESTION_FOUND);
    // NOTE: question list valid after this line

    var temp_history = await googlePalmSolver(question_list, jobs_id)

    res.send({
      state: 'ask googlePalm done',
      json_input,
      chat_history: {
        q_and_a: temp_history
      }
    });

  } catch (error) {
    console.log(error);

    if (error.message == NO_QUESTION_FOUND) {
      res.send({ 'state': 'hello no question found' });
      return
    }

    res.send({ 'state': "unknown error", error_messge: error.message });
  }

  // res.send({ 'state': "unknown error", error_messge: error.message });
  // res.send({ 'hello': "google Palm" })
});

router.post('/test', (req, res) => {
  res.send('googlePalm Hello, World!');
});

console.log('init googlePalm worker');

module.exports = router;
