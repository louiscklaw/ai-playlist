const puppeteer = require('puppeteer-core');
// const chalk = require('chalk');

var assert = require('chai').assert

require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;



// NOTE: init answer_idx,

async function initChatGptPage(page) {
  await page.goto('https://poe.com/ChatGPT');
  return 'init ChatGPT page';
}

async function clearChatHistory(page) {
  // NOTE: clear chat history
  // ChatBreakButton_button__
  await page.waitForSelector('textarea[placeholder="Talk to ChatGPT on Poe"]');
  await page.type('textarea[placeholder="Talk to ChatGPT on Poe"]', "start a new chat", { delay: 50 });
  await page.waitForSelector('[class*="sendButton"]');
  await page.evaluate(() => { document.querySelector('[class*="sendButton"]').click(); });

  await page.waitForSelector('[class*="ChatBreakButton_button__"]', { waitUntil: "networkidle0", });
  await page.waitForSelector('[class*="Message_botMessageBubble__"]', { waitUntil: "networkidle0", });
  await page.waitForTimeout(3 * 1000);
  await page.evaluate(() => {
    document.querySelector('[class*="ChatBreakButton_button__"]').click();
    document.querySelectorAll('[class*="Message_botMessageBubble__"]').forEach(item => item.remove())
  });

}

async function clearModalBox(page) {
  // NOTE: clear modal box if any
  console.log('clear modal box');

  await page.waitForTimeout(1 * 1000);
  await page.evaluate(() => {
    try {
      document.querySelector('.ReactModal__Content').style.display = 'none'
      document.querySelector('.ReactModal__Overlay').style.display = 'none'
    } catch (error) {
      console.log(error)
    }
  });
  await page.waitForTimeout(1 * 1000);

}

async function questionAndAnswer(page, question, answer_idx) {
  const countAnswerBubble = (page) => {
    return page.evaluate(() => {
      return document.querySelectorAll('[class*="Message_botMessageBubble__"]').length
    })
  }

  var current_answer_bubble_length = await countAnswerBubble(page);
  var new_answer_bubble_length = 0;

  await page.type('textarea[placeholder="Talk to ChatGPT on Poe"]', question, { delay: 50 });
  await page.waitForSelector('[class*="sendButton"]')
  await page?.evaluate(() => {
    document.querySelector('[class*="sendButton"]').click()
  })

  var reply = '...';
  await page.waitForSelector(`[class*="Message_botMessageBubble__"]`, { waitUntil: "networkidle0", });
  console.log({ current_answer_bubble_length, new_answer_bubble_length });
  for (var countdown = 10; countdown > 0; countdown--) {
    var new_answer_bubble_length = await countAnswerBubble(page);
    if (new_answer_bubble_length > current_answer_bubble_length) {
      // NOTE: new answer bubble appear
      break
    } else {
      // NOTE: no new answer bubble appear, keep waiting
      await page.waitForTimeout(1 * 1000);
    }
  }

  console.log({ current_answer_bubble_length, new_answer_bubble_length });

  // NOTE: wait for text type complete
  await page.waitForTimeout(1 * 1000);
  for (var countdown = 10; countdown > 0; countdown--) {
    reply = await page.evaluate((answer_idx) => {
      return document.querySelectorAll('[class*="Message_botMessageBubble__"]')
        .item(answer_idx)
        .textContent;
    }, new_answer_bubble_length - 1);

    if (countdown > 0 && reply.trim() == '...') {
      console.log({ countdown, reply });
      await page.waitForTimeout(1 * 1000);
    } else {
      break
    }
  }

  return reply;
}

// start
(async () => {
  var answer_idx = -1;

  const browser = await puppeteer.launch({
    product: 'firefox',
    headless: false,
    executablePath: '/usr/bin/firefox',
    userDataDir: FIREFOX_DATA_DIR,
    slowMo: 1,
    // NOTE: https://wiki.mozilla.org/Firefox/CommandLineOptions
    defaultViewport: { width: 1024, height: 768 },
    ignoreHTTPSErrors: true,
  });
  const page = await browser.newPage();

  await initChatGptPage(page);
  await clearChatHistory(page);
  await clearModalBox(page);

  answer_idx++;
  var reply = await questionAndAnswer(page, "say 'hello 1' to me", answer_idx);
  assert(reply.toLowerCase().indexOf('hello 1') >= 0, `reply failed :${reply.toLowerCase().indexOf('hello 1')}`);

  answer_idx++;
  var reply = await questionAndAnswer(page, "say 'hello 2' to me", answer_idx);
  assert(reply.toLowerCase().indexOf('hello 2') >= 0, `reply failed :${reply.toLowerCase().indexOf('hello 2')}`);


  answer_idx++;
  var reply = await questionAndAnswer(page, "say 'hello 3' to me", answer_idx);
  assert(reply.toLowerCase().indexOf('hello 3') >= 0, `reply failed :${reply.toLowerCase().indexOf('hello 3')}`);

  await page.waitForTimeout(9999 * 1000);

  console.log('test done'); z

  await page.close();
  await browser.close();
})();
