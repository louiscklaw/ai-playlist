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
    // slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
    args: ['--no-sandbox', `--user-data-dir=${CHROME_DATA_DIR}`]
  });
  // const page = await browser.newPage();
  const page = (await browser.pages())[0];

  try {
    console.log(question_list);
    await initGooglePaLMPage(page);
    await clearChatHistory(page);
    await clearModalBox(page);

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      chat_history.history.push({ question, answer });
    }


    await page.waitForTimeout(10 * 1000);
    await page.screenshot({ path: '/share/chrome_googlePalm_result.png', fullPage: true })

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
