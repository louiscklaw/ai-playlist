// const express = require('express');

const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();

const { UTILS_ROOT } = require('../../../config');
const { getRandomSecond } = require('../../../utils/getRandomSecond');
const { initBrowser } = require(`${UTILS_ROOT}/initBrowser`);

const {
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  checkLoginState,
} = require(`${UTILS_ROOT}/chatGPT`);

async function chatGPTSolver(question_list, jobs_id, preprompts = []) {
  var chat_history = { session_id: jobs_id, preprompts: [], history: [] };
  var answer_idx = -1;

  const browser = await initBrowser();
  const page = (await browser.pages())[0];

  try {
    await initChatGptPage(page);
    await checkLoginState(page);

    await clearChatHistory(page);
    await clearModalBox(page);

    if (preprompts.length > 0) {
      for (var i = 0; i < preprompts.length; i++) {
        var question = preprompts[i];
        answer_idx++;

        var answer = await questionAndAnswer(page, question, answer_idx);
        chat_history.preprompts.push({ question, answer });
        await page.waitForTimeout(getRandomSecond(5, 15) * 1000);
      }
    }

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      chat_history.history.push({ question, answer });
      await page.waitForTimeout(getRandomSecond(5, 10) * 1000);
    }

    // NOTE: successful ask, cool down bot for slething
    console.log('successful ask, cooldown bot');
    await page.waitForTimeout(1 * 60 * 1000);
    console.log('cooldown bot done');
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }

  return chat_history;
}


async function testLanding() {
  var result = { status: 'done' };

  const browser = await initBrowser();
  const page = (await browser.pages())[0];

  try {
    await initChatGptPage(page);
    await checkLoginState(page);
    await clearChatHistory(page);
    await clearModalBox(page);

    await page.waitForTimeout(10 * 1000);
  } catch (error) {
    throw error;
  } finally {
    await browser.close();
  }

  return result;
}

module.exports = {
  testLanding,
  chatGPTSolver,
};
