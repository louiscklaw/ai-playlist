// const express = require('express');
// const { getRandomInt } = require('../../../utils/getRandomInt');
// const { OUT_OF_QUOTA } = require('./error');
// const { DONE, ERROR } = require('../../../constants');

// const puppeteer = require('puppeteer-extra');

// const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
// puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

// const StealthPlugin = require('puppeteer-extra-plugin-stealth');
// puppeteer.use(StealthPlugin());
// const { initBrowser } = require(`${UTILS_ROOT}/initBrowser`);
// const { UTILS_ROOT } = require('../../../config');

const fs = require('fs');

require('dotenv').config();

const { gptBotCooldown } = require('./gptBotCooldown');
const { testLanding } = require('./testLanding');
const { CANONICAL_HOSTNAME } = require('../../../config');

const { getRandomSecond } = require('../../../utils/getRandomSecond');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { poeDownAlert } = require('../../../utils/poeDownAlert');
const { initBrowser } = require('../../../utils/initBrowser');
const {
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  checkLoginState,
} = require('../../../utils/chatGPT');
const { checkIfOutOfQuota } = require('../../../utils/checkIfOutOfQuota');

async function chatGPTSolver(question_list, preprompts = []) {
  var chat_history = { state: 'INIT', preprompts: [], history: [] };
  var answer_idx = -1;

  const browser = await initBrowser();
  const page = (await browser.pages())[0];

  try {
    await initChatGptPage(page);
    await checkLoginState(page);

    await checkIfOutOfQuota(page);

    await clearChatHistory(page);
    await clearModalBox(page);

    // TODO: need to handle "message cannot send"
    if (preprompts.length > 0) {
      for (var i = 0; i < preprompts.length; i++) {
        var question = preprompts[i];
        answer_idx++;

        var { answer, _raw_html } = await questionAndAnswer(page, question, answer_idx);
        console.log({ answer, _raw_html });

        chat_history.preprompts.push({ question, answer, _raw_html });

        // TODO: remove this
        // await page.waitForTimeout(getRandomSecond(5, 15) * 1000);
        await gptBotCooldown(getRandomSecond(5, 15), page);
      }
    }

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var { answer, _raw_html } = await questionAndAnswer(page, question, answer_idx);
      chat_history.history.push({ question, answer, _raw_html });

      // TODO: remove this
      // await page.waitForTimeout(getRandomSecond(5, 15) * 1000);
      await gptBotCooldown(getRandomSecond(5, 15), page);
    }

    chat_history = { ...chat_history, state: 'done' };

    await browser.close();
  } catch (error) {
    chat_history = { ...chat_history, state: 'error', error };

    var md5 = calculateMD5(error);
    var content = JSON.stringify({ question_list, preprompts, error:JSON.stringify(error), chat_history });
    var filename = `/logs/error/openbox-poe-seat/${md5}.json`;
    fs.writeFileSync(filename, content, { encoding: 'utf8' });

    poeDownAlert(CANONICAL_HOSTNAME);

    if (browser?.close) await browser.close();

    throw error;
  }

  if (browser?.close) await browser.close();

  return chat_history;
}

module.exports = {
  testLanding,
  chatGPTSolver,
};
