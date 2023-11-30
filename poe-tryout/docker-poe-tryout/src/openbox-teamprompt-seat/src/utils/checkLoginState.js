const { myLogger } = require('./myLogger');

async function checkLoginState(page) {
  try {
    myLogger.info('chatGPT.js: checkLoginState');

    const selector = 'textarea[placeholder="Talk to ChatGPT on Poe"]';
    await page.waitForSelector(selector);
    await page.waitForTimeout(1 * 1000);
  } catch (error) {
    // myLogger.info('chatGPT.js: gpt input box not found, check if logged out')
    myLogger.error('error during checkLoginState');
    throw new Error('gpt input box not found, check if logged out');
  }
}

module.exports = {
  checkLoginState,
};
