// const express = require('express');

const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();

const { UTILS_ROOT } = require('../../../config');
const { getRandomSecond } = require('../../../utils/getRandomSecond');
const { getRandomInt } = require('../../../utils/getRandomInt');
const { initBrowser } = require(`${UTILS_ROOT}/initBrowser`);

const {
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  checkLoginState,
} = require(`${UTILS_ROOT}/chatGPT`);

function getNMinutesLater(n_minute = 0) {
  // Get the current date and time
  var currentTime = new Date();

  // Add 2 minutes to the current time
  var futureTime = new Date(currentTime.getTime() + n_minute * 60000);

  // Extract hours and minutes from the future time
  var hours = futureTime.getHours();
  var minutes = futureTime.getMinutes();

  // Format hours and minutes with leading zeros if necessary
  hours = ('0' + hours).slice(-2);
  minutes = ('0' + minutes).slice(-2);

  // Display the future time in HH:MM format
  console.log(hours + ':' + minutes);
}

async function gptBotCooldown(time_s, page) {
  try {
    await page.waitForTimeout(time_s * 1000);
  } catch (error) {
    console.log('error during gptBotCooldown');
    throw error;
  }
}

async function chatGPTSolver(question_list, preprompts = []) {
  var chat_history = { preprompts: [], history: [] };
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

        // TODO: remove this
        // await page.waitForTimeout(getRandomSecond(5, 15) * 1000);
        await gptBotCooldown(getRandomSecond(5, 15), page);
      }
    }

    for (var i = 0; i < question_list.length; i++) {
      var question = question_list[i];
      answer_idx++;

      var answer = await questionAndAnswer(page, question, answer_idx);
      chat_history.history.push({ question, answer });

      // TODO: remove this
      // await page.waitForTimeout(getRandomSecond(5, 15) * 1000);
      await gptBotCooldown(getRandomSecond(5, 15), page);
    }

    await browser.close();
  } catch (error) {
    throw error;
  } finally {
    if (browser?.close) await browser.close();
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
