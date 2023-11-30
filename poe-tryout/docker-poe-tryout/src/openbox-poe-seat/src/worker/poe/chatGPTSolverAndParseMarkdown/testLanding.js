// const express = require('express');
require('dotenv').config();

const { initChatGptPage } = require('../../../utils/initChatGptPage');
const { clearChatHistory } = require('../../../utils/clearChatHistory');
const { clearModalBox } = require('../../../utils/clearModalBox');
const { checkLoginState } = require('../../../utils/checkLoginState');
const { initBrowser } = require('../../../utils/initBrowser');

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
