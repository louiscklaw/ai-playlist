const express = require('express');
const router = express.Router();

const NO_QUESTION_FOUND = 'no question found';
const QUESTION_LIST_NOT_FOUND = 'question list not found';

const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

require('dotenv').config();
const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../../../config');
const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory`);

const {
  helloworld,
  initGooglePaLMPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  assertKeyWord,
} = require(`${UTILS_ROOT}/googlePalm`);

async function googlePalmSolver(question_list, jobs_id) {
  var chat_history = { session_id: jobs_id, history: [] };
  var answer_idx = -1;

  const browser = await puppeteer.launch({
    product: 'chrome',
    headless: false,
    executablePath: '/usr/bin/google-chrome-stable',
    userDataDir: CHROME_DATA_DIR,
    slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', `--user-data-dir=${CHROME_DATA_DIR}`]
  });
  const page = await browser.newPage();

  try {
    await initGooglePaLMPage(page);
    await clearChatHistory(page);
    await clearModalBox(page);

    var i = 0;
    answer_idx++, i++;
    var reply = await questionAndAnswer(page, `say 'hello 1' to me`, answer_idx);
    assertKeyWord(reply, `hello 1`);

    answer_idx++, i++;
    var reply = await questionAndAnswer(page, `say 'hello 2' to me`, answer_idx);
    assertKeyWord(reply, `hello 2`);

    answer_idx++, i++;
    var reply = await questionAndAnswer(page, `say 'hello 3' to me`, answer_idx);
    assertKeyWord(reply, `hello 3`);

    // await page.waitForTimeout(9999 * 1000);

    console.log(chalk.green('test pass'));
  } catch (error) {
    console.log(error);
  } finally {
    await page.close();
    await browser.close();
  }

  return chat_history
}

module.exports = {
  googlePalmSolver
}
