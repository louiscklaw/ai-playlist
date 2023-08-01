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

    slowMo: true,
  });
  const page = await browser.newPage();

  await page.goto('https://poe.com/ChatGPT');
  await page.screenshot({ path: '/share/chatgpt.png', });

  // await page.waitForSelector('textarea[placeholder="Talk to ChatGPT on Poe"]')
  await page.type('textarea[placeholder="Talk to ChatGPT on Poe"]', "type 'helloworld' to me", { delay: 100 });

  await page.waitForSelector('[class*="sendButton"]')
  // await page.click('button.Button_buttonBase__0QP_m:nth-child(3)');
  await page?.evaluate(() => {
    document.querySelector('[class*="sendButton"]').click()
  })

  await page.waitForTimeout(9999 * 1000);

  await page.close();
  await browser.close();
})();
