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

async function gptBotCooldown(time_s, page) {
  try {
    await page.waitForTimeout(time_s * 1000);
  } catch (error) {
    console.log('error during gptBotCooldown');
    throw error;
  }
}

module.exports = { gptBotCooldown };
