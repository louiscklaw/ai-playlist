const { myLogger } = require('./myLogger');

var assert = require('chai').assert;

async function botCooldown(time_s, page) {
  await page.waitForTimeout(time_s * 1000);
}

async function initChatGptPage(page) {
  await page.goto('https://poe.com/ChatGPT');
  return 'init ChatGPT page';
}

// https://www.cointracker.io/
// https://www.g2.com/products/asana/reviews
async function tackleCloudflare(page) {
  // await page.goto('https://www.cointracker.io', {
  //   //wait for website to load
  //   waitUntil: 'load',
  // });

  // page.goto('https://www.g2.com/products/asana/reviews');

  // // https://bot.sannysoft.com
  page.goto('https://bot.sannysoft.com');
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '/share/testresult.png', fullPage: true });

  // // https://finviz.com/news.ashx
  // await page.goto('https://finviz.com/news.ashx', {
  //   //wait for website to load
  //   waitUntil: 'networkidle0'
  // });

  return 'init tackleCloudflare page';
}

async function clearChatHistory(page) {
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
}

async function clearModalBox(page) {
  // NOTE: clear modal box if any
  myLogger.info('chatGPT.js (obsoleted): clear modal box');

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
}

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
      myLogger.info('typing question ...');

      await page.type('textarea[placeholder="Talk to ChatGPT on Poe"]', list_lines[i], { delay: 0.01 });
      await page.keyboard.down('ShiftLeft');
      await page.keyboard.down('Enter');
      await page.waitForTimeout(1);
      await page.keyboard.up('Enter');
      await page.keyboard.up('ShiftLeft');

      await page.waitForTimeout(1);
    }

    myLogger.info('chatGPT.js (obsoleted): wait for send button ready');
    await page.waitForSelector('button[class*="sendButton"]:not([disabled])');

    myLogger.info('chatGPT.js (obsoleted): press send button');
    await page?.evaluate(() => {
      document.querySelector('button[class*="sendButton"]:not([disabled])').click();
    });

    var reply = '...';
    await page.waitForSelector(`[class*="Message_botMessageBubble__"]`, { waitUntil: 'networkidle0' });
    // console.log({ current_answer_bubble_length, new_answer_bubble_length });

    for (var countdown = 30; countdown > 0; countdown--) {
      var new_answer_bubble_length = await countAnswerBubble(page);
      if (new_answer_bubble_length > current_answer_bubble_length) {
        // NOTE: new answer bubble appear
        myLogger.info('wait for new answer bubble appear')
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

    await page.waitForSelector(`[class*="Message_botMessageBubble__"]`);
    for (var countdown = 9999; countdown > 0; countdown--) {
      var result_json = await page.evaluate(() => {
        try {
          var last_bubble_idx = document.querySelectorAll('[class*="Message_botMessageBubble__"]').length - 1
          var ele = document.querySelectorAll('[class*="Message_botMessageBubble__"]').item(last_bubble_idx);
          return JSON.stringify({
            answer: ele.textContent,
            error: false,
            _raw_html: ele.outerHTML,
          });
        } catch (error) {
          console.log('chatGPT.js (obsoleted): error captured');

          // NOTE: meaningless, just try best to capture the error
          console.error(JSON.stringify(error));

          // return { answer: '...', error, _raw_html:"" };
          return JSON.stringify({ answer: 'error_found', error, _raw_html: '' });
        }
      });
      var { answer, error, _raw_html } = JSON.parse(result_json);

      if (error) console.log(error);

      if (countdown > 0 && (answer.trim() == '...' || answer.trim() == 'error_found')) {
        // bot not answer yet
        myLogger.info(JSON.stringify({ countdown, answer, error }));

        await page.waitForTimeout(1 * 1000);
      } else {
        if (isFirstCheck()) {
          myLogger.info('chatGPT.js (obsoleted): first check found');
          old_answer = answer;
          await page.waitForTimeout(1 * 1000);
        } else {
          // is the bot still typing ?
          if (isTheBotStillTyping(answer, old_answer)) {
            old_answer = answer;
            myLogger.info(`chatGPT.js (obsoleted): bot still typing, countdown:${countdown}`);
            // myLogger.info({ countdown, answer });
            await page.waitForTimeout(3 * 1000);
          } else {
            // bot not typing
            myLogger.info('chatGPT.js (obsoleted): bot typing done');
            break;
          }
        }
      }
    }

    if (answer == 'error_found') throw new Error('cannot get answer from poe');

    return { answer, _raw_html };
  } catch (error) {
    console.log(error);
  }
}

function assertKeyWord(to_check, keyword_wanted) {
  return assert(
    to_check.toLowerCase().indexOf(keyword_wanted) >= -1,
    `reply failed -> no "${keyword_wanted}", 
    to_check:${to_check}`,
  );
}

function helloworld(test_call = '') {
  myLogger.info(test_call);
  myLogger.info('chatGPT.js (obsoleted): helloworld');
}

async function checkLoginState(page) {
  try {
    myLogger.info('chatGPT.js (obsoleted): checkLoginState');

    const selector = 'textarea[placeholder="Talk to ChatGPT on Poe"]';
    await page.waitForSelector(selector);
    await page.waitForTimeout(1 * 1000);
  } catch (error) {
    // myLogger.info('chatGPT.js (obsoleted): gpt input box not found, check if logged out')
    throw new Error('gpt input box not found, check if logged out');
  }
}

module.exports = {
  helloworld,
  tackleCloudflare,
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  assertKeyWord,
  checkLoginState,
};
