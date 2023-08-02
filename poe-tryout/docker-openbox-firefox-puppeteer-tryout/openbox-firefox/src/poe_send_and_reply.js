const puppeteer = require('puppeteer-core');
// const chalk = require('chalk');

var assert = require('chai').assert;

require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;

const { helloworld, initChatGptPage, clearChatHistory, clearModalBox, questionAndAnswer } = require('./utils/chatGPT');

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

  await initChatGptPage(page);
  await clearChatHistory(page);
  await clearModalBox(page);

  answer_idx++;
  var reply = await questionAndAnswer(page, "say 'hello 1' to me", answer_idx);
  assert(reply.toLowerCase().indexOf('hello 1') >= 0, `reply failed :${reply.toLowerCase().indexOf('hello 1')}`);

  answer_idx++;
  var reply = await questionAndAnswer(page, "say 'hello 2' to me", answer_idx);
  assert(reply.toLowerCase().indexOf('hello 2') >= 0, `reply failed :${reply.toLowerCase().indexOf('hello 2')}`);

  answer_idx++;
  var reply = await questionAndAnswer(page, "say 'hello 3' to me", answer_idx);
  assert(reply.toLowerCase().indexOf('hello 3') >= 0, `reply failed :${reply.toLowerCase().indexOf('hello 3')}`);

  // await page.waitForTimeout(9999 * 1000);

  console.log('test done');

  await page.close();
  await browser.close();
})();
