const puppeteer = require('puppeteer-core');
// const chalk = require('chalk');
const { SRC_ROOT, UTILS_ROOT } = require('../../config.js');

var assert = require('chai').assert

require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;

const { helloworld,
  initChatGptPage, clearChatHistory, clearModalBox, questionAndAnswer
} = require(`${UTILS_ROOT}/chatGPT`);

// helloworld();

var chat_history = [];

// start
(async () => {
  const CHAT_SESSION = '1';

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

  try {


    await initChatGptPage(page);
    await clearChatHistory(page);
    await clearModalBox(page);

    answer_idx++;
    var question = "say 'hello 1' to me";
    var answer = await questionAndAnswer(page, question, answer_idx);
    assert(answer.toLowerCase().indexOf('hello 1') >= 0, `answer failed :${answer.toLowerCase().indexOf('hello 1')}`);
    // chatHistory.push({ CHAT_SESSION, question, answer });

    // answer_idx++;
    // var reply = await questionAndAnswer(page, "say 'hello 2' to me", answer_idx);
    // assert(reply.toLowerCase().indexOf('hello 2') >= 0, `reply failed :${reply.toLowerCase().indexOf('hello 2')}`);


    // answer_idx++;
    // var reply = await questionAndAnswer(page, "say 'hello 3' to me", answer_idx);
    // assert(reply.toLowerCase().indexOf('hello 3') >= 0, `reply failed :${reply.toLowerCase().indexOf('hello 3')}`);

    // await page.waitForTimeout(9999 * 1000);

    console.log('test done');

  } catch (error) {
    console.log({ CHAT_SESSION })

  } finally {
    await page.close();
    await browser.close();
  }
})();
