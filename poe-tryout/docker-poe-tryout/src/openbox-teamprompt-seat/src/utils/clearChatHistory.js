const { myLogger } = require('./myLogger');

async function clearChatHistory(page) {
  try {
    // NOTE: clear chat history
    // ChatBreakButton_button__
    await page.waitForSelector('textarea[placeholder="Talk to ChatGPT on Poe"]');
    await page.type(
      'textarea[placeholder="Talk to ChatGPT on Poe"]',
      'Please forget everything and start a fresh talk.',
      { delay: 1 },
    );
    await page.waitForSelector('[class*="sendButton"]');
    await page.evaluate(() => {
      document.querySelector('[class*="sendButton"]').click();
    });

    await page.waitForSelector('[class*="ChatBreakButton_button__"]', { waitUntil: 'networkidle0' });
    await page.waitForSelector('[class*="Message_botMessageBubble__"]', { waitUntil: 'networkidle0' });
    await page.waitForTimeout(3 * 1000);
    await page.evaluate(() => {
      document.querySelector('[class*="ChatBreakButton_button__"]').click();
      document.querySelectorAll('[class*="Message_botMessageBubble__"]').forEach(item => item.remove());
    });
  } catch (error) {
    myLogger.error('error during clearChatHistory');
    throw error;
  }
}

module.exports = {
  clearChatHistory,
};
