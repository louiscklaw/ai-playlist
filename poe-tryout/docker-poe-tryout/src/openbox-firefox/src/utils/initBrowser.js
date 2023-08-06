const assert = require('chai').assert;

const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();
const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;
const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../config');

async function initStealthing(page) {
  await page.evaluate(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => undefined,
    });
  });
}
async function testStealthing(page) {
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
}

async function initBrowser() {
  var browser = await puppeteer.launch({
    product: 'chrome',
    headless: false,
    executablePath: '/usr/bin/google-chrome-stable',
    userDataDir: CHROME_DATA_DIR,
    slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
    args: [`--user-data-dir=${CHROME_DATA_DIR}`],
  });

  const page = (await browser.pages())[0];
  await initStealthing(page);
  await testStealthing(page);

  return browser;
}

function helloworldBrowser() {
  console.log('helloworld');
}

module.exports = {
  initBrowser,
  helloworldBrowser,
};
