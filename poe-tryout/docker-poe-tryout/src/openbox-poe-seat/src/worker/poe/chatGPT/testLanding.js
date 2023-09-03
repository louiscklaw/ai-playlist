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
const { gptBotCooldown } = require('./gptBotCooldown');
const { initBrowser } = require(`${UTILS_ROOT}/initBrowser`);

const {
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer,
  checkLoginState,
} = require(`${UTILS_ROOT}/chatGPT`);

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

module.exports = { testLanding };
