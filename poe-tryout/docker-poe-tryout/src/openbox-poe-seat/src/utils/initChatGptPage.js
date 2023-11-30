const { myLogger } = require('./myLogger');

async function initChatGptPage(page) {
  try {
    await page.goto('https://poe.com/ChatGPT');
    return 'init ChatGPT page';
  } catch (error) {
    myLogger.error('error during initChatGptPage');
    throw error;
  }
}

module.exports = {
  initChatGptPage,
};
