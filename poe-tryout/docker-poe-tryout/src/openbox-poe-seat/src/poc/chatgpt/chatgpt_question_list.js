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
    // slowMo: 1,
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

    var question1 = "say 'hello 1' to me";
    var question2 = "say 'hello 2' to me";
    var question3 = "say 'hello 3' to me";

    var question_list = [question1, question2, question3];

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      await appendChat(session_id, { question, answer });
    }

    // await page.waitForTimeout(9999 * 1000);

    console.log('test done');
  } catch (error) {
    console.log({ CHAT_SESSION });
  } finally {
    await page.close();
    await browser.close();
  }
})();
