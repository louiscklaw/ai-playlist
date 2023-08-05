const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// NOTE: original use puppeteer core only
// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

require('dotenv').config();
const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

const { SRC_ROOT, UTILS_ROOT, PROMPT_ROOT, ERROR_ROOT, ROUTES_ROOT } = require('./config');
const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory`);
const { helloworld_prompt, helloworld_summarize } = require(`${PROMPT_ROOT}`)
const { helloworld_error } = require(`${ERROR_ROOT}`);
const helloRoutes = require('./routes/hello');
const summarizeRoutes = require('./routes/summarize');

const {
  helloworld,
  initChatGptPage,
  clearChatHistory,
  clearModalBox,
  questionAndAnswer, checkLoginState
} = require(`${UTILS_ROOT}/chatGPT`);

console.log(helloworld_error);
console.log(helloworld_prompt);
console.log(helloworld_summarize);
console.log('helloworld');

// Register the routes
app.use('/hello', helloRoutes);
app.use('/summarize', summarizeRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
