const puppeteer = require('puppeteer-core');
const chalk = require('chalk');
// var assert = require('chai').assert

require('dotenv').config();
const { FIREFOX_DATA_DIR } = process.env;

const {
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  assertKeyWord
} = require('../../../utils/poe');
// const { TEST_LOUIS_STACK } = require('./prompt.js');
const {
  TASK_DESCRIPTION,
  helloworld_louis_paragraph
} = require('./prompt.js');

// start
(async () => {
  var answer_idx = -1;

  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,
    executablePath: '/usr/bin/firefox',
    userDataDir: FIREFOX_DATA_DIR,
    slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  session_retry = true

  while (session_retry) {
    session_retry = false;
  }

  await page.waitForTimeout(10 * 1000);

  await initChatGptPage(page);
  await clearChatHistory(page);
  await clearModalBox(page);

  answer_idx++;
  var reply = await questionAndAnswer(page, TASK_DESCRIPTION(), answer_idx);
  console.log({ reply });
  // assertKeyWord(reply, 'yes');

  var reply = await questionAndAnswer(page, helloworld_louis_paragraph(), answer_idx);
  assertKeyWord(reply, 'louis');

  await page.waitForTimeout(9999 * 1000);

  console.log(chalk.green('test pass'));


  await page.close();
  await browser.close();
})();
