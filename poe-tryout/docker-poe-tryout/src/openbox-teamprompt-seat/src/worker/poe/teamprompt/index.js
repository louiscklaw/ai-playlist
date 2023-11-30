
const fs = require('fs');

require('dotenv').config();

// const { gptBotCooldown } = require('./gptBotCooldown');


async function teampromptSolver(question_list, preprompts = []) {
  var chat_history = { state: 'INIT', preprompts: [], history: [] };
  var answer_idx = -1;

  const browser = await initBrowser();
  const page = (await browser.pages())[0];

  try {
    const countAnswerBubble = page => {
      return page.evaluate(() => {
        return document.querySelectorAll('[from="response"]').length;
      });
    };

    await page.type('textarea[placeholder="Ask a question or Give me a command. Be Specific."]',
      list_lines[i],
      { delay: 0.01 }
    );

    console.log({ countAnswerBubble });

  } catch (error) {

  }

  if (browser?.close) await browser.close();

  return chat_history;
}

module.exports = {
  teampromptSolver,
};
