const puppeteer = require('puppeteer-core');
const chalk = require('chalk');

var assert = require('chai').assert;

require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;

const {
  helloworld,
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  assertKeyWord,
} = require('../../utils/chatGPT');
const { TEST_LOUIS_STACK } = require('./prompt');

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
  var reply = await questionAndAnswer(page, TEST_LOUIS_STACK(''), answer_idx);
  assertKeyWord(reply, 'yes');

  var reply = await questionAndAnswer(page, 'What is this person name ?', answer_idx);
  assertKeyWord(reply, 'is louis');

  var reply = await questionAndAnswer(page, 'Which subject is this person studied in ?', answer_idx);
  assertKeyWord(reply, 'electronic and communication engineering');

  var reply = await questionAndAnswer(page, 'What is the working experience of this person ?', answer_idx);
  assertKeyWord(reply, 'china mobile hong kong');
  assertKeyWord(reply, 'sierrawireless');

  var reply = await questionAndAnswer(page, 'What louis love when louis free ?', answer_idx);
  assertKeyWord(reply, 'programming');
  assertKeyWord(reply, 'hardware');
  assertKeyWord(reply, 'software');
  assertKeyWord(reply, 'photographs');
  assertKeyWord(reply, 'walk');

  // await page.waitForTimeout(9999 * 1000);

  console.log(chalk.green('test pass'));

  await page.close();
  await browser.close();
})();
