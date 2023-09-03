// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// const { executablePath } = require('puppeteer')

// const chalk = require('chalk');
// const { SRC_ROOT, UTILS_ROOT } = require('../../../config');
// const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory.js`);

var assert = require('chai').assert;

require('dotenv').config();

const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

// const {
//   helloworld,
//   initChatGptPage,
//   clearChatHistory,
//   clearModalBox,
//   questionAndAnswer, tackleCloudflare
// } = require(`${UTILS_ROOT}/chatGPT`);

// start
(async () => {
  puppeteer
    .launch({
      product: 'chrome',
      headless: false,
      executablePath: '/usr/bin/google-chrome-stable',
      userDataDir: CHROME_DATA_DIR,
   //   slowMo: 1,
      // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
      defaultViewport: { width: 1024, height: 768 * 10 },
      ignoreHTTPSErrors: true,
      args: ['--no-sandbox', `--user-data-dir=${CHROME_DATA_DIR}`],
    })
    .then(async browser => {
      console.log('Running tests..');
      // const page = await browser.newPage()
      const page = (await browser.pages())[0];
      await page.evaluate(() => {
        Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
      });

      await page.goto('https://poe.com/ChatGPT', { waitUntil: 'load' });
      await page.waitForTimeout(10 * 1000);

      // https://amiunique.org/fingerprint

      await page.screenshot({ path: '/share/firefox_landing.png', fullPage: true });

      await page.waitForTimeout(9999 * 1000);
      await browser.close();
      // console.log(`All done, check the screenshot. ✨`)
    });
})();
