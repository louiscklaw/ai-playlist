const { initBrowser } = require('./utils/initBrowser');

console.log('start chrome js');

(async () => {
  try {
    const browser = await initBrowser();
    const page = (await browser.pages())[0];

    await page.waitForTimeout(9999 * 1000);
  } catch (error) {
    console.log(error);
  }
})();
