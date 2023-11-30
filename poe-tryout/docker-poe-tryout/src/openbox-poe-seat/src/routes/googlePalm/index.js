const express = require('express');
const router = express.Router();

const puppeteer = require('puppeteer-extra');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();
// const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

const { myLogger } = require('../../utils/myLogger');

const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../../config');
const { googlePalmSolver, testLanding } = require(`${WORKER_ROOT}/poe/googlePalm`);

// const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory`);
const { ASK_DONE } = require(`${SRC_ROOT}/constants`);

// TODO: remove me
// const {
//   initChatGptPage,
//   clearChatHistory,
//   clearModalBox,
//   helloworld,
//   initGooglePaLMPage,
//   questionAndAnswer,
//   assertKeyWord,
// } = require(`${UTILS_ROOT}/google-palm`);

router.post('/ask', async (req, res) => {
  var json_input = req.body;

  try {
    var { jobs_id, question_list } = json_input;
    // res.send(question_list)
    if (!question_list) throw new Error(QUESTION_LIST_NOT_FOUND);
    if (question_list?.length < 1) throw new Error(NO_QUESTION_FOUND);
    // NOTE: question list valid after this line

    var temp_history = await googlePalmSolver(question_list, jobs_id);

    res.send({
      state: ASK_DONE,
      json_input,
      chat_history: {
        q_and_a: temp_history,
      },
    });
  } catch (error) {
    console.log(error);

    if (error.message == NO_QUESTION_FOUND) {
      res.send({ state: 'hello no question found' });
      return;
    }

    res.send({ state: 'unknown error', error_messge: error.message });
  }

  // res.send({ 'state': "unknown error", error_messge: error.message });
  // res.send({ 'hello': "google Palm" })
});

// NOTE: test with src/openbox-firefox/src/tests/googlePalm/helloworld
router.get('/helloworld', (req, res) => {
  res.send('googlePalm Hello, World!');
});

myLogger.info('init googlePalm worker');

module.exports = router;
