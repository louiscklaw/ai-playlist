const puppeteer = require('puppeteer-core');
// const chalk = require('chalk');

// start
(async () => {
  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,

    // TODO: confirm useless and remove me,
    // userDataDirectory: '/share/firefox',
    // TODO: confirm useless and remove me,

    executablePath: '/usr/bin/firefox',

    userDataDir: '/share/firefox',
    ignoreHTTPSErrors: true,
    slowMo: 100,
    defaultViewport: { width: 1024, height: 768 }
  });

  const pages = await browser.pages();
  const page = pages[0];

  await page.goto('http://example.com');

  await page.evaluate((test_input, input_1) => {
    console.log('helloworld')
    console.log(test_input)
    console.log(input_1)
  }, 'blablabla', 'hello1')

  var test_return = 'not set', countdown = 10;

  for (var countdown = 10; countdown > 0; countdown--) {
    var testH1 = await page.evaluate(() => {
      return document.querySelector('h1').textContent;
    })

    // NOTE: exit criteria
    if (countdown > 8) {

    } else {
      break
    }
  }

  await page.waitForTimeout(9999 * 1000);

  await page.close();
  await browser.close();
})();
