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
// const { TEST_LOUIS_STACK } = require('./prompt');
const { helloworld, post_medical_sample, TASK_DESCRIPTION, END_WITH_YES, helloworld_louis_paragraph,
  post_hardware_engineer_sample } = require('./prompt');

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

  var reply = await questionAndAnswer(page, post_hardware_engineer_sample(), answer_idx);
  // assertKeyWord(reply, 'louis');
  console.log({ reply });

  var reply = await questionAndAnswer(page,
    `
Please tell me if this job relevant to computer science?  
Yes ? No? or Not certain ? 
Please try best to make the answer simple.`.trimStart(), answer_idx);
  assertKeyWord(reply, 'yes');

  var reply = await questionAndAnswer(page,
    `
Please tell me if this job relevant to electronic engineering?
Yes ? No? or Not certain ? 
Please try best to make the answer simple.`.trimStart(), answer_idx);
  assertKeyWord(reply, 'yes');

  var reply = await questionAndAnswer(page,
    `
Please tell me if this job relevant to software testing?
Yes ? No? or Not certain ? 
Please try best to make the answer simple.`.trimStart(), answer_idx);
  assertKeyWord(reply, 'no');

  var reply = await questionAndAnswer(page,
    `
Please tell me if this job relevant to web programming?
Yes ? No? or Not certain ? 
Please try best to make the answer simple.`.trimStart(), answer_idx);
  assertKeyWord(reply, 'no');

  // var reply = await questionAndAnswer(page,
  //   'what is the company name ?', answer_idx);
  // // assertKeyWord(reply, 'no');
  // console.log({ reply });

  // var reply = await questionAndAnswer(page, "What is the working experience of this person ?", answer_idx);
  // assertKeyWord(reply, 'china mobile hong kong');
  // assertKeyWord(reply, 'sierrawireless');

  // var reply = await questionAndAnswer(page, "What louis love when louis free ?", answer_idx);
  // assertKeyWord(reply, 'programming');
  // assertKeyWord(reply, 'hardware');
  // assertKeyWord(reply, 'software');
  // assertKeyWord(reply, 'photographs');
  // assertKeyWord(reply, 'walk');

  // await page.waitForTimeout(9999 * 1000);

  console.log(chalk.green('test pass'));


  await page.close();
  await browser.close();
})();
