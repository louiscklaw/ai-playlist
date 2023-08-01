const puppeteer = require('puppeteer-core');
const chalk = require('chalk');
// var assert = require('chai').assert

require('dotenv').config();
const { FIREFOX_DATA_DIR } = process.env;

const {
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  helloworld,
  initGooglePaLMPage,
  questionAndAnswer,
  assertKeyWord
} = require('../../utils/google-palm');
const { getRandomInt } = require('../../utils/getRandomInt');

// const {
//   test_markdown_content, TASK_DESCRIPTION
// } = require('./prompt');

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
  await page.waitForTimeout(getRandomInt(10, 5) * 1000);

  try {

    await initGooglePaLMPage(page);
    await clearChatHistory(page);
    await clearModalBox(page);

    var i = 0;
    answer_idx++, i++;
    var reply = await questionAndAnswer(page, `say 'hello 1' to me`, answer_idx);
    assertKeyWord(reply, `hello 1`);

    answer_idx++, i++;
    var reply = await questionAndAnswer(page, `say 'hello 2' to me`, answer_idx);
    assertKeyWord(reply, `hello 2`);

    answer_idx++, i++;
    var reply = await questionAndAnswer(page, `say 'hello 3' to me`, answer_idx);
    assertKeyWord(reply, `hello 3`);

    // var reply = await questionAndAnswer(page, test_markdown_content, answer_idx);
    // console.log({ reply });

    // // var reply = await questionAndAnswer(page, helloworld_louis_paragraph(), answer_idx);
    // // assertKeyWord(reply, 'louis');

    await page.waitForTimeout(9999 * 1000);

    // console.log(chalk.green('test pass'));

  } catch (error) {
    console.log(error);

  } finally {
    await page.close();
    await browser.close();

  }
})();
