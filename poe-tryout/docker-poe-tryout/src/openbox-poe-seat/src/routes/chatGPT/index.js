const express = require('express');
const router = express.Router();

// TODO: remove me
// const NO_QUESTION_FOUND = 'no question found';
// const QUESTION_LIST_NOT_FOUND = 'question list not found';

// const puppeteer = require('puppeteer-extra');

// const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
// puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());

// require('dotenv').config();
// const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../../config');
// const { myLogger } = require('../../utils/myLogger');
// const { checkInput } = require('./checkInput');
// const { reportOffline } = require('../../utils/reportPoeSeatOffline');
// const { DONE, ERROR } = require('../../constants');
// const { ASK_INIT, ASK_DONE } = require(`${SRC_ROOT}/constants`);
// const { chatGPTSolver, testLanding } = require(`${WORKER_ROOT}/poe/chatGPT`);

require('./ask_with_md')(router);
require('./ask')(router);
require('./helloworld')(router);
require('./testLanding')(router);

module.exports = router;
