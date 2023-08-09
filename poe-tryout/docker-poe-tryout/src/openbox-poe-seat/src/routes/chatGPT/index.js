const express = require('express');
const router = express.Router();

const NO_QUESTION_FOUND = 'no question found';
const QUESTION_LIST_NOT_FOUND = 'question list not found';

const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// require('dotenv').config();

const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../../config');

const { ASK_DONE } = require(`${SRC_ROOT}/constants`);

const { chatGPTSolver, testLanding } = require(`${WORKER_ROOT}/poe/chatGPT`);

router.post('/ask', async (req, res) => {
  var json_input = req.body;

  try {
    var { jobs_id, question_list, preprompts } = json_input;
    // res.send(question_list)
    if (!question_list) throw new Error(QUESTION_LIST_NOT_FOUND);
    if (question_list?.length < 1) throw new Error(NO_QUESTION_FOUND);
    // NOTE: question list valid after this line

    var temp_history = await chatGPTSolver(question_list, jobs_id, preprompts);

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
});

// NOTE: test with src/openbox-firefox/src/tests/chatGPT/helloworld
router.get('/testLanding', async (req, res) => {
  var result = await testLanding();
  res.send(result);
  // res.send('helloworld')
});

// NOTE: test with src/openbox-firefox/src/tests/chatGPT/helloworld
router.get('/helloworld', (req, res) => {
  res.send('helloworld from chatGPT!');
});

module.exports = router;
