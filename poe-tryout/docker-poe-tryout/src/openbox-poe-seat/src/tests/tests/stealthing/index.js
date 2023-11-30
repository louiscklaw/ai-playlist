// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// const { executablePath } = require('puppeteer')

// const chalk = require('chalk');
const { SRC_ROOT, UTILS_ROOT } = require('../../../config');
const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory.js`);

var assert = require('chai').assert;

require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;

const {
  helloworld,
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  tackleCloudflare,
} = require(`${UTILS_ROOT}/chatGPT`);

// start
(async () => {
  const CHAT_SESSION = '2';

  var answer_idx = -1;

  puppeteer
    .launch({
      product: 'chrome',
      headless: false,
      executablePath: '/usr/bin/google-chrome-stable',
      userDataDir: FIREFOX_DATA_DIR,
   //   slowMo: 1,
      // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
      defaultViewport: { width: 1024, height: 768 * 2 },
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox'],
    })
    .then(async browser => {
      console.log('Running tests..');
      // const page = await browser.newPage()
      const page = (await browser.pages())[0];

      // await page.waitForTimeout(9999 * 1000);

      // // await page.goto('https://bot.sannysoft.com')
      // // https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html
      await page.goto('https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html', {
        waitUntil: 'load',
      });

      // await page.evaluate(async () => {
      //   delete navigator.__proto__.webdriver;

      //   console.log('webdriver' in navigator ? 'detected' : 'not detected')
      //   console.log(navigator.webdriver === undefined ? 'not detected' : 'detected')
      //   // but!
      //   console.log(Object.getOwnPropertyDescriptor(navigator.__proto__, 'webdriver') === undefined ? 'not detected' : 'detected once')
      //   for (let prop in navigator) {
      //     if (prop === 'webdriver') {
      //       console.log('detected twice')
      //     }
      //   }
      // });

      await page.waitForTimeout(1 * 1000);
      await page.screenshot({ path: '/share/stealth_result.png', fullPage: true });
      // await browser.close()
      // console.log(`All done, check the screenshot. ✨`)
    });
})();
