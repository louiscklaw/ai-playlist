const puppeteer = require('puppeteer-core');
// const chalk = require('chalk');

var assert = require('chai').assert;

require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;

const {
  helloworld,
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
} = require('../../utils/chatGPT');
const { TEST_SWIR_LOUIS } = require('./prompt');

// helloworld();

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

  session_retry = true;

  while (session_retry) {
    session_retry = false;
  }

  await page.waitForTimeout(10 * 1000);

  await initChatGptPage(page);
  await clearChatHistory(page);
  await clearModalBox(page);

  answer_idx++;
  var reply = await questionAndAnswer(page, TEST_SWIR_LOUIS(''), answer_idx);
  assert(reply.toLowerCase().indexOf('yes') >= 0, `reply failed reply:${reply}`);

  var reply = await questionAndAnswer(page, 'What is this person name ?', answer_idx);
  assert(reply.toLowerCase().indexOf('is louis') >= 0, `reply failed, reply:${reply}`);

  var reply = await questionAndAnswer(page, 'Which subject is this person studied in ?', answer_idx);
  assert(reply.toLowerCase().indexOf('electronic and communication engineering') >= 0, `reply failed, reply:${reply}`);

  var reply = await questionAndAnswer(page, 'What is the working experience of this person ?', answer_idx);
  assert(reply.toLowerCase().indexOf('hong kong') >= 0, `reply failed, reply:${reply}`);
  assert(reply.toLowerCase().indexOf('sierrawireless') >= 0, `reply failed, reply:${reply}`);

  // await page.waitForTimeout(9999 * 1000);

  console.log('test pass');

  await page.close();
  await browser.close();
})();
