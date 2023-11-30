const { myLogger } = require('./myLogger');
const fs = require('fs')

async function questionAndAnswerWithMd(page, question, answer_idx) {
  try {
    const countAnswerBubble = page => {
      return page.evaluate(() => {
        return document.querySelectorAll('[class*="Message_botMessageBubble__"]').length;
      });
    };

    var current_answer_bubble_length = await countAnswerBubble(page);
    var new_answer_bubble_length = 0;

    var list_lines = question.split('\n');
    for (var i = 0; i < list_lines.length; i++) {
      await page.type('textarea[placeholder="Talk to ChatGPT on Poe"]', list_lines[i], { delay: 1 });
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.down('Enter');
      await page.keyboard.up('Enter');
      await page.keyboard.up('ShiftLeft');
    }

    myLogger.info('questionAndAnswerWithMd.js: wait for send button ready');
    await page.waitForSelector('button[class*="sendButton"]:not([disabled])');
    myLogger.info('questionAndAnswerWithMd.js: press send button');
    await page?.evaluate(() => {
      document.querySelector('button[class*="sendButton"]:not([disabled])').click();
    });

    var reply = '...';
    await page.waitForSelector(`[class*="Message_botMessageBubble__"]`, { waitUntil: 'networkidle0' });
    // console.log({ current_answer_bubble_length, new_answer_bubble_length });

    for (var countdown = 20; countdown > 0; countdown--) {
      var new_answer_bubble_length = await countAnswerBubble(page);
      if (new_answer_bubble_length > current_answer_bubble_length) {
        // NOTE: new answer bubble appear
        break;
      } else {
        // NOTE: no new answer bubble appear, keep waiting
        await page.waitForTimeout(1 * 1000);
      }
    }
    myLogger.info(JSON.stringify({ current_answer_bubble_length, new_answer_bubble_length }));

    // NOTE: wait for text type complete
    await page.waitForTimeout(3 * 1000);
    var old_reply = '';
    const isTheBotStillTyping = (reply, old_reply) => reply != old_reply; // return true if the bot is typing

    var first_check = true;
    const isFirstCheck = () => {
      if (first_check) {
        first_check = false;
        return true;
      }
      return first_check;
    };

    var result = {};
    for (var countdown = 60; countdown > 0; countdown--) {
      result = await page.evaluate(answer_idx => {
        var browser_md_reply = [];
        var txt_reply = '';

        var ele_answer = document.querySelectorAll('[class*="Message_botMessageBubble__"]').item(answer_idx);
        txt_reply = ele_answer.textContent;

        if (ele_answer) {
          var md_ele_len = ele_answer.querySelectorAll('[class*="MarkdownCodeBlock_preTag"]').length;
          for (var i = 0; i < md_ele_len; i++) {
            var ele_mdContext = ele_answer.querySelectorAll('[class*="MarkdownCodeBlock_preTag"]').item(i).textContent;
            browser_md_reply.push(ele_mdContext);
          }
        }

        return { reply: txt_reply, md_reply: browser_md_reply };
      }, new_answer_bubble_length - 1);

      var { reply, md_reply } = result;

      if (countdown > 0 && reply.trim() == '...') {
        // bot not answer yet
        myLogger.info(JSON.stringify({ countdown, reply }));

        await page.waitForTimeout(1 * 1000);
      } else {
        if (isFirstCheck()) {
          myLogger.info('questionAndAnswerWithMd.js: first check found');
          old_reply = reply;
          await page.waitForTimeout(1 * 1000);
        } else {
          // is the bot still typing ?
          if (isTheBotStillTyping(reply, old_reply)) {
            old_reply = reply;
            myLogger.info(`questionAndAnswerWithMd.js: bot still typing, countdown:${countdown}`);
            // myLogger.info({ countdown, reply });
            await page.waitForTimeout(3 * 1000);
          } else {
            // bot not typing
            myLogger.info('questionAndAnswerWithMd.js: bot typing done');
            break;
          }
        }
      }
    }

    return result;
  } catch (error) {
    myLogger.error('error during questionAndAnswerWithMd');
    
    console.log({question})

    await fs.writeFileSync(
      '/share/testing/questionAndAnswerWithMd.json',
      JSON.stringify({question}),
      {encoding:'utf8'}
    )
    
    throw error;
  }
}

module.exports = {
  questionAndAnswerWithMd,
};
