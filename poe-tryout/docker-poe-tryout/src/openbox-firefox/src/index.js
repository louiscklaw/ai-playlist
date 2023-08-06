const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// NOTE: original use puppeteer core only
// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

require('dotenv').config();
// const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;

const { PROMPT_ROOT, ERROR_ROOT } = require('./config');

// const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory`);

const { helloworld_prompt, helloworld_summarize } = require(`${PROMPT_ROOT}`);
const { helloworld_error } = require(`${ERROR_ROOT}`);

const helloRoutes = require('./routes/hello');
const summarizeRoutes = require('./routes/summarize');
const chatGPTRoutes = require('./routes/chatGPT');
const googlePalmRoutes = require('./routes/googlePalm');

console.debug(helloworld_error);
console.debug(helloworld_prompt);
console.debug(helloworld_summarize);
console.debug('helloworld');

// Register the routes
app.use('/hello', helloRoutes);
app.use('/summarize', summarizeRoutes);
app.use('/chatGPT', chatGPTRoutes);
app.use('/googlePalm', googlePalmRoutes);

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
