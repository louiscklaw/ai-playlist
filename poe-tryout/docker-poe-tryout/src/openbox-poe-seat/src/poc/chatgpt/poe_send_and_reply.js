const puppeteer = require('puppeteer-core');
// const chalk = require('chalk');
const { SRC_ROOT, UTILS_ROOT } = require('../../config.js');
const { newChat, appendChat } = require('../../utils/chatHistory.js');

var assert = require('chai').assert;

require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;

const {
  helloworld,
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
} = require(`${UTILS_ROOT}/chatGPT`);

// start
(async () => {
  const CHAT_SESSION = '1';

  var answer_idx = -1;

  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,
    executablePath: '/usr/bin/firefox',
    userDataDir: FIREFOX_DATA_DIR,
 //   slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  try {
    await initChatGptPage(page);
    await clearChatHistory(page);
    await clearModalBox(page);
    var session_id = await newChat();

    answer_idx++;
    var question = "say 'hello 1' to me";
    var answer = await questionAndAnswer(page, question, answer_idx);
    assert(answer.toLowerCase().indexOf('hello 1') >= 0, `answer failed :${answer.toLowerCase().indexOf('hello 1')}`);
    await appendChat(session_id, { question, answer });

    answer_idx++;
    var question = "say 'hello 2' to me";
    var answer = await questionAndAnswer(page, question, answer_idx);
    assert(answer.toLowerCase().indexOf('hello 2') >= 0, `answer failed :${answer.toLowerCase().indexOf('hello 2')}`);
    await appendChat(session_id, { question, answer });

    answer_idx++;
    var question = "say 'hello 3' to me";
    var answer = await questionAndAnswer(page, question, answer_idx);
    assert(answer.toLowerCase().indexOf('hello 3') >= 0, `answer failed :${answer.toLowerCase().indexOf('hello 3')}`);
    await appendChat(session_id, { question, answer });

    // await page.waitForTimeout(9999 * 1000);

    console.log('test done');
  } catch (error) {
    console.log({ CHAT_SESSION });
  } finally {
    await page.close();
    await browser.close();
  }
})();
