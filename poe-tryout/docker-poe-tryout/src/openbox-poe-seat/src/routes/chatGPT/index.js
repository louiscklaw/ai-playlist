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
const { myLogger } = require('../../utils/myLogger');
const { checkInput } = require('./checkInput');
const { reportOffline } = require('../../utils/reportPoeSeatOffline');
const { DONE, ERROR } = require('../../constants');
const { ASK_INIT, ASK_DONE } = require(`${SRC_ROOT}/constants`);
const { chatGPTSolver, testLanding } = require(`${WORKER_ROOT}/poe/chatGPT`);

router.post('/ask', async (req, res) => {
  var json_input = req.body;
  var output = {
    state: ASK_INIT,
    input: json_input,
    error: '',
    chat_history: { q_and_a: { preprompts: [], history: [] } },
  };

  try {
    console.log(json_input)
    
    checkInput(json_input);

    var { question_list, preprompts } = json_input;
    // res.send(question_list)
    // TODO: check using schema
    if (!question_list) throw new Error(QUESTION_LIST_NOT_FOUND);
    if (question_list?.length < 1) throw new Error(NO_QUESTION_FOUND);
    // NOTE: question list valid after this line

    var temp_history = await chatGPTSolver(question_list, preprompts);
    var { state, preprompts, history } = temp_history;
    if (state != 'done') throw new Error('error during ask ChatGPT');

    output = {
      ...output,
      state: ASK_DONE,
      json_input,
      chat_history: { q_and_a: { preprompts, history } },
    };
  } catch (error) {
    myLogger.error(JSON.stringify(error));
    output = { ...output, state: ERROR, error: JSON.stringify(error) };
    reportOffline();
  }

  res.send(output);
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
