const chalk = require('chalk');

var assert = require('chai').assert;

async function clearModalBox(page) {
  // NOTE: clear modal box if any
  console.log('clear modal box');

  await page.waitForTimeout(1 * 1000);
  await page.evaluate(() => {
    try {
      document.querySelector('.ReactModal__Content').style.display = 'none';
      document.querySelector('.ReactModal__Overlay').style.display = 'none';
    } catch (error) {
      console.log(error);
    }
  });
  await page.waitForTimeout(1 * 1000);
}

async function clearChatHistory(page) {
  // NOTE: clear chat history
  // ChatBreakButton_button__
  await page.waitForSelector('textarea[placeholder="Talk to Google-PaLM on Poe"]');
  await page.type(
    'textarea[placeholder="Talk to Google-PaLM on Poe"]',
    'Please forget everything and start a fresh talk',
    { delay: 50 },
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
}

async function questionAndAnswer(page, question, answer_idx) {
  const countAnswerBubble = page => {
    return page.evaluate(() => {
      return document.querySelectorAll('[class*="Message_botMessageBubble__"]').length;
    });
  };

  var current_answer_bubble_length = await countAnswerBubble(page);
  var new_answer_bubble_length = 0;

  var list_lines = question.split('\n');
  for (var i = 0; i < list_lines.length; i++) {
    await page.type('textarea[placeholder="Talk to Google-PaLM on Poe"]', list_lines[i], { delay: 1 });
    await page.keyboard.down('ShiftLeft');
    await page.keyboard.down('Enter');
    await page.keyboard.up('Enter');
    await page.keyboard.up('ShiftLeft');
  }

  console.log('wait for send button ready');
  await page.waitForSelector('button[class*="sendButton"]:not([disabled])');
  console.log('press send button');
  await page?.evaluate(() => {
    document.querySelector('button[class*="sendButton"]:not([disabled])').click();
  });

  var reply = '...';
  await page.waitForSelector(`[class*="Message_botMessageBubble__"]`, { waitUntil: 'networkidle0' });
  console.log({ current_answer_bubble_length, new_answer_bubble_length });
  for (var countdown = 10; countdown > 0; countdown--) {
    var new_answer_bubble_length = await countAnswerBubble(page);
    if (new_answer_bubble_length > current_answer_bubble_length) {
      // NOTE: new answer bubble appear
      break;
    } else {
      // NOTE: no new answer bubble appear, keep waiting
      await page.waitForTimeout(1 * 1000);
    }
  }

  console.log({ current_answer_bubble_length, new_answer_bubble_length });

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
      return document.querySelectorAll('[class*="Message_botMessageBubble__"]').item(answer_idx).textContent;
    }, new_answer_bubble_length - 1);

    if (countdown > 0 && reply.trim() == '...') {
      // bot not answer yet
      console.log({ countdown, reply });
      await page.waitForTimeout(1 * 1000);
    } else {
      if (isFirstCheck()) {
        console.log('google-palm.js: first check found');
        old_reply = reply;
        await page.waitForTimeout(1 * 1000);
      } else {
        // is the bot still typing ?
        if (isTheBotStillTyping(reply, old_reply)) {
          old_reply = reply;
          console.log('google-palm.js: bot still typing');
          // console.log({ countdown, reply });
          await page.waitForTimeout(3 * 1000);
        } else {
          // bot not typing
          console.log('google-palm.js: bot typing done');
          break;
        }
      }
    }
  }

  return reply;
}

async function initGooglePaLMPage(page) {
  await page.goto('https://poe.com/GooglePaLM');
  return 'init GooglePaLM page';
}

function assertKeyWord(to_check, keyword_wanted) {
  return assert(
    to_check.toLowerCase().indexOf(keyword_wanted) >= -1,
    chalk.yellow(`reply failed -> no "${keyword_wanted}", to_check:${to_check}`),
  );
}

function helloworld(test_call = '') {
  console.log(test_call);
  console.log('helloworld from google-palm.js');
}

module.exports = {
  helloworld,
  initGooglePaLMPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  assertKeyWord,
};
