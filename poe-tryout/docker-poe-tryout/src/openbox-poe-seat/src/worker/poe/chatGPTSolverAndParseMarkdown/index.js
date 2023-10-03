// const express = require('express');
const fs = require('fs');

require('dotenv').config();

const { getRandomSecond } = require('../../../utils/getRandomSecond');
const { initBrowser } = require('../../../utils/initBrowser');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { poeDownAlert } = require('../../../utils/poeDownAlert');
const { questionAndAnswerWithMd } = require('../../../utils/questionAndAnswerWithMd');
const { clearModalBox } = require('../../../utils/clearModalBox');
const { initChatGptPage } = require('../../../utils/initChatGptPage');
const { clearChatHistory } = require('../../../utils/clearChatHistory');
const { checkLoginState } = require('../../../utils/checkLoginState');

const { CANONICAL_HOSTNAME, UTILS_ROOT } = require('../../../config');

const { gptBotCooldown } = require('./gptBotCooldown');
const { testLanding } = require('./testLanding');

// const { getRandomInt } = require('../../../utils/getRandomInt');
// const { OUT_OF_QUOTA } = require('./error');
// const { DONE, ERROR } = require('../../../constants');

const { checkIfOutOfQuota } = require(`${UTILS_ROOT}/checkIfOutOfQuota`);

async function chatGPTSolverAndParseMarkdown(question_list, preprompts = []) {
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

        var answer = await questionAndAnswerWithMd(page, question, answer_idx);
        console.log({ answer });

        chat_history.preprompts.push({ question, answer });

        // TODO: remove this
        // await page.waitForTimeout(getRandomSecond(5, 15) * 1000);
        await gptBotCooldown(getRandomSecond(5, 15), page);
      }
    }

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswerWithMd(page, question, answer_idx);
      chat_history.history.push({ question, answer });

      // TODO: remove this
      // await page.waitForTimeout(getRandomSecond(5, 15) * 1000);
      await gptBotCooldown(getRandomSecond(5, 15), page);
    }

    chat_history = { ...chat_history, state: 'done' };

    await browser.close();
  } catch (error) {
    chat_history = { ...chat_history, state: 'error', error };

    var md5 = calculateMD5(error);
    var content = JSON.stringify({ question_list, preprompts, error, chat_history });
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
  chatGPTSolverAndParseMarkdown,
};
