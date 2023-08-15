'use strict';
// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// const { SRC_ROOT, UTILS_ROOT } = require('../../../config');

require('dotenv').config();
const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

var assert = require('chai').assert;

// start
(async () => {
  console.log('test start');

  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,
    executablePath: '/usr/bin/google-chrome-stable',
    // userDataDir: CHROME_DATA_DIR,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 * 2 },
    ignoreHTTPSErrors: true,
    args: [`--user-data-dir=${CHROME_DATA_DIR}`],
  });

  console.log('Running tests..');
  const page = (await browser.pages())[0];
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });
  });
  await page.goto('https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html');
  var webdriver_result = await page.evaluate(() => {
    return document.querySelector('#webdriver-result').textContent;
  });
  assert(webdriver_result == 'missing (passed)', 'webdriver selthing test failed !');

  await page.goto('http://bait:8080/navigator_webdriver_test.html', { waitUntil: 'load' });
  webdriver_result = await page.evaluate(() => {
    return document.querySelector('#webdriver-result').textContent;
  });
  assert(webdriver_result == 'undefined', 'navigator.Webdriver not equal to undefined');

  await browser.close();
})();
