const puppeteer = require('puppeteer-core');
// const chalk = require('chalk');

// start
(async () => {
  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,

    // TODO: confirm useless and remove me,
    // userDataDirectory: '/share/firefox',
    // args: ["--profile /share/firefox"],
    // TODO: confirm useless and remove me,


    executablePath: '/usr/bin/firefox',
    userDataDir: '/share/firefox',
  });
  const page = await browser.newPage();

  await page.goto('http://192.168.10.223:8080/read.html');
  await page.screenshot({ path: '/share/gmail.png', });

  await page.waitForTimeout(999 * 1000);

  await page.close();
  await browser.close();
})();
