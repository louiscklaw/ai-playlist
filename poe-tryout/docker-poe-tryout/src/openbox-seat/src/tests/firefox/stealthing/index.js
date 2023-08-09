// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

// const { SRC_ROOT, UTILS_ROOT } = require('../../../config');

require('dotenv').config();
const { FIREFOX_DATA_DIR } = process.env;

// start
(async () => {
  puppeteer
    .launch({
      product: 'firefox',
      headless: false,
      executablePath: '/usr/bin/firefox',
      userDataDir: FIREFOX_DATA_DIR,
      slowMo: 1,
      // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
      defaultViewport: { width: 1024, height: 768 * 2 },
      ignoreHTTPSErrors: true,
    })
    .then(async browser => {
      console.log('Running tests..');
      // const page = await browser.newPage()
      const page = (await browser.pages())[0];

      // await page.waitForTimeout(9999 * 1000);

      // // await page.goto('https://bot.sannysoft.com')
      // // https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html
      // await page.goto('https://intoli.com/blog/not-possible-to-block-chrome-headless/chrome-headless-test.html', { waitUntil: 'load' })
      // await page.goto('https://mitm.it');
      // navigator_webdriver_test
      await page.goto('http://bait:8080/navigator_webdriver_test.html', { waitUntil: 'load' });
      //

      await page.waitForTimeout(1 * 1000);
      await page.screenshot({ path: '/share/firefox_stealth_result.png', fullPage: true });
      // await browser.close()
      // console.log(`All done, check the screenshot. ✨`)
    });
})();
