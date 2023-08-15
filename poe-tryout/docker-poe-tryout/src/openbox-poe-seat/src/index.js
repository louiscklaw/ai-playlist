const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();
  // const { FIREFOX_DATA_DIR, CHROME_DATA_DIR } = process.env;
const { PROMPT_ROOT, ERROR_ROOT } = require('./config');

const app = express();
app.use(bodyParser.json());

// NOTE: original use puppeteer core only
// const puppeteer = require('puppeteer-core');
const puppeteer = require('puppeteer-extra');

try {
  const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
  puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

  const StealthPlugin = require('puppeteer-extra-plugin-stealth');
  puppeteer.use(StealthPlugin());

  // const { newChat, appendChat } = require(`${UTILS_ROOT}/chatHistory`);

  require(`${PROMPT_ROOT}`);
  require(`${ERROR_ROOT}`);

  const summarizeRoutes = require('./routes/summarize');
  const chatGPTRoutes = require('./routes/chatGPT');
  const googlePalmRoutes = require('./routes/googlePalm');

  // TODO: remove me ?
  // const { helloworldBrowser } = require('./utils/initBrowser');
  // helloworldBrowser();

  // Register the routes
  app.use('/summarize', summarizeRoutes);
  app.use('/chatGPT', chatGPTRoutes);
  app.use('/googlePalm', googlePalmRoutes);
  app.use('/stealthCheck', require('./routes/stealthCheck'));
  app.use('/hello', require('./routes/hello'));

  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
} catch (error) {
  console.log({ error });
}
