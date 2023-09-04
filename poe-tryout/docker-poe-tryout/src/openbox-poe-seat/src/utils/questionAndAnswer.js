const { myLogger } = require('./myLogger');

// TODO: remove me
// var assert = require('chai').assert;

async function questionAndAnswer(page, question, answer_idx) {
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
      await page.type('textarea[placeholder="Talk to ChatGPT on Poe"]', list_lines[i], { delay: 0.1 });

      await page.keyboard.down('ShiftLeft');
      await page.keyboard.down('Enter');
      await page.waitForTimeout(1);
      await page.keyboard.up('Enter');
      await page.keyboard.up('ShiftLeft');

      await page.waitForTimeout(1);
    }

    myLogger.info('questionAndAnswer.js: wait for send button ready');
    await page.waitForSelector('button[class*="sendButton"]:not([disabled])');
    
    myLogger.info('questionAndAnswer.js: press send button');
    await page?.evaluate(() => {
      document.querySelector('button[class*="sendButton"]:not([disabled])').click();
    });

    // TODO: turn into replying
    var reply = '...';
    await page.waitForSelector(`[class*="Message_botMessageBubble__"]`, { waitUntil: 'networkidle0' });
    // console.log({ current_answer_bubble_length, new_answer_bubble_length });

    for (var countdown = 30; countdown > 0; countdown--) {
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

    for (var countdown = 60; countdown > 0; countdown--) {
      reply = await page.evaluate(answer_idx => {
        try {
          return document.querySelectorAll('[class*="Message_botMessageBubble__"]').item(answer_idx).textContent;
        } catch (error) {
          console.log('error captured');
          console.error(JSON.stringify(error));
  
          return '...';
        }
      }, new_answer_bubble_length - 1);
  
      if (countdown > 0 && reply.trim() == '...') {
        // bot not answer yet
        myLogger.info(JSON.stringify({ countdown, reply }));

        await page.waitForTimeout(1 * 1000);
      } else {
        if (isFirstCheck()) {
          myLogger.info('questionAndAnswer.js: first check found');
          old_reply = reply;
          await page.waitForTimeout(1 * 1000);
        } else {
          // is the bot still typing ?
          if (isTheBotStillTyping(reply, old_reply)) {
            old_reply = reply;
            myLogger.info(`questionAndAnswer.js: bot still typing, countdown:${countdown}`);
            // myLogger.info({ countdown, reply });
            await page.waitForTimeout(3 * 1000);
          } else {
            // bot not typing
            myLogger.info('questionAndAnswer.js: bot typing done');
            break;
          }
        }
      }
    }

    return reply;
  } catch (error) {
    myLogger.error('error during questionAndAnswer');
    throw error;
  }
}

module.exports = {
  questionAndAnswer,
};
