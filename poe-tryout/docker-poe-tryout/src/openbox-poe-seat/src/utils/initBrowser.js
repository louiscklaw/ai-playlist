require('dotenv').config();
var { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;
const { SRC_ROOT, UTILS_ROOT, WORKER_ROOT } = require('../config');

const assert = require('chai').assert;

const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

if (!CHROME_DATA_DIR) {
  console.log('chrome data dir not set, default to /tmp');
  CHROME_DATA_DIR = '/tmp/chrome-data-dir';
}

async function initStealthing(page) {
  try {
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });
    });
  } catch (error) {
    console.log('error during initStealthing');
    console.log(error);
    throw error;
  }
}

async function testStealthing(page) {
  try {
    await page.goto('https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html');
    var webdriver_result = await page.evaluate(() => {
      return document.querySelector('#webdriver-result').textContent;
    });
    var chrome_result = await page.evaluate(() => {
      return document.querySelector('#chrome-result').textContent;
    });

    assert(webdriver_result == 'missing (passed)', 'webdriver should be missing !');
    assert(chrome_result == 'present (passed)', 'should present !');

    await page.goto('http://bait:8080/navigator_webdriver_test.html', { waitUntil: 'load' });
    webdriver_result = await page.evaluate(() => {
      return document.querySelector('#webdriver-result').textContent;
    });
    assert(webdriver_result == 'undefined', 'navigator.Webdriver not equal to undefined');
  } catch (error) {
    console.log('error during testStealthing');
    console.log(error);
    throw error;
  }
}

async function initBrowser() {
  try {
    var browser = await puppeteer.launch({
      product: 'chrome',
      headless: false,
      executablePath: '/usr/bin/google-chrome-stable',
      userDataDir: CHROME_DATA_DIR,
   //   slowMo: 1,
      // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
      defaultViewport: { width: 1024, height: 768 },
      ignoreHTTPSErrors: true,
      args: [`--user-data-dir=${CHROME_DATA_DIR}`],
    });

    const page = (await browser.pages())[0];
    await initStealthing(page);
    await testStealthing(page);

    return browser;
  } catch (error) {
    console.log('error during initBrowser');
    console.log(error);
    throw error;
  }
}

function helloworldBrowser() {
  console.log('helloworld');
}

module.exports = {
  initBrowser,
  helloworldBrowser,
};
