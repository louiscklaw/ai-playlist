const { myLogger } = require('./myLogger');

async function clearModalBox(page) {
  try {
    // NOTE: clear modal box if any
    myLogger.info('chatGPT.js: clear modal box');

    await page.waitForTimeout(1 * 1000);
    await page.evaluate(() => {
      try {
        document.querySelector('.ReactModal__Content').style.display = 'none';
        document.querySelector('.ReactModal__Overlay').style.display = 'none';
      } catch (error) {
        console.error('%o', error);
      }
    });
    await page.waitForTimeout(1 * 1000);
  } catch (error) {
    myLogger.error('error clearModalBox');
    throw error;
  }
}

module.exports = {
  clearModalBox,
};
