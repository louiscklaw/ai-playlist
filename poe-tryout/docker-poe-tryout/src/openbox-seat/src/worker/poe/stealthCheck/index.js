const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();
const { UTILS_ROOT, SRC_ROOT } = require('../../../config');
const { BROWSER_STEALTH_CHECK_INIT, BROWSER_STEALTH_CHECK_OK } = require(`${SRC_ROOT}/constants`);
const { initBrowser } = require(`${UTILS_ROOT}/initBrowser`);

require(`${UTILS_ROOT}/chatGPT`);

async function stealthCheck() {
  var result = { status: BROWSER_STEALTH_CHECK_INIT, error: {} };
  var browser = {};

  try {
    // stealth check occurs on every initBrowser
    browser = await initBrowser();
    const page = (await browser.pages())[0];

    await page.waitForTimeout(1 * 100);

    result = { ...result, state: BROWSER_STEALTH_CHECK_OK };
  } catch (error) {
    console.log('error during stealth check');
    console.log(error);
    // throw error;
    result = { ...result, state: BROWSER_STEALTH_CHECK_FAIL, error };
  } finally {
    if (browser?.close) await browser.close();
  }

  return result;
}

module.exports = {
  stealthCheck,
};
