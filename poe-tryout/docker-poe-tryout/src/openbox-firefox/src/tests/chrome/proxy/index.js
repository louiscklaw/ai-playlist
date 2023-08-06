// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

require('dotenv').config();
const { FIREFOX_DATA_DIR } = process.env;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/usr/bin/firefox',
    userDataDir: FIREFOX_DATA_DIR,
  });
  const page = await browser.newPage();

  await page.goto('http://mitm.it');
  await page.screenshot({
    path: '/share/firefox_proxy_test_result.png',
    fullPage: true,
  });
  console.log('test done');
})();
