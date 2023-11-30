const { initBrowser } = require('../../utils/initBrowser');

async function ask(question_list, preprompts = []) {
  var chat_history = { state: 'INIT', preprompts: [], history: [] };
  var answer_idx = -1;
  var gpt_reply = "error";
  var bubble_before_question = 0;
  var bubble_after_question = -1;

  const browser = await initBrowser();
  const page = (await browser.pages())[0];

  try {


    await page.goto('https://teamprompt.ai/chat-room', { waitUntil: 'networkidle2' });

    bubble_before_question = await page.evaluate(() => {
      return document.querySelectorAll('div[from="response"]').length
    })

    await page.type('textarea', question_list[0], { delay: 100 });

    await page.evaluate(() => {
      document.querySelector('button[type="submit"]').click();
    });

    while (bubble_after_question <= bubble_before_question) {
      await page.waitForTimeout(1 * 1000);

      bubble_after_question = await page.evaluate(() => {
        return document.querySelectorAll('div[from="response"] p').length
      });
    }

    bubble_idx = bubble_after_question - 1
    gpt_reply = await page.evaluate(({ bubble_idx }) => {
      return document.querySelectorAll('div[from="response"]')[bubble_idx].textContent
    }, { bubble_idx });


  } catch (error) {
    console.log(error);

  }

  browser && browser.close();
  return { gpt_reply, bubble_after_question };
}

module.exports = { ask, };
