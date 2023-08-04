const puppeteer = require('puppeteer-core');
const chalk = require('chalk');
const { UTILS_ROOT } = require('../../../config');

require('dotenv').config();
const { FIREFOX_DATA_DIR } = process.env;

const {
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  assertKeyWord,
  checkLoginState,
} = require(`${UTILS_ROOT}/chatGPT`);

const {
  helloworld,
  post_medical_sample,
  TASK_DESCRIPTION,
  END_WITH_YES,
  helloworld_louis_paragraph,
} = require('./prompt');
const { newChat, appendChat } = require('../../../utils/chatHistory');

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

  try {
    await page.waitForTimeout(3 * 1000);

    await initChatGptPage(page);
    await checkLoginState(page);

    await clearChatHistory(page);
    await clearModalBox(page);
    var session_id = await newChat();

    var question1 = TASK_DESCRIPTION();
    var question2 = helloworld_louis_paragraph();
    // var question3 = "say 'hello 3' to me";

    var question_list = [question1, question2];

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      await appendChat(session_id, { question, answer });
    }

    console.log(chalk.green('test pass'));
  } catch (error) {
    console.log(error);
  } finally {
    await page.close();
    await browser.close();
  }
})();