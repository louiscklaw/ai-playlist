const express = require('express');
const router = express.Router();

const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();
const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../../../config');
const { myLogger } = require('../../../utils/myLogger');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory`);

const {
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
    args: ['--no-sandbox', `--user-data-dir=${CHROME_DATA_DIR}`],
  });
  // const page = await browser.newPage();
  const page = (await browser.pages())[0];

  try {
    myLogger.info("%o",question_list);

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
    await page.screenshot({ path: '/share/chrome_googlePalm_result.png', fullPage: true });
  } catch (error) {
    chat_history = { ...chat_history, state: 'error', error };

    var md5 = calculateMD5(error)
    var content = JSON.stringify({question_list, preprompts, error, chat_history})
    var filename = `/logs/error/openbox-poe-seat/${md5}.json`
    fs.writeFileSync(filename, content, {encoding:'utf8'})

    if (browser?.close) await browser.close();

    throw error;
  } 
  
  if (browser?.close) await browser.close();

  return chat_history;
}

module.exports = {
  googlePalmSolver,
};
