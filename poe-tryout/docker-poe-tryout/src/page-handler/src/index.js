'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const { myLogger } = require('./utils/myLogger');

try {
  const app = express();
  app.use(bodyParser.json());

  // app.use('/jobsdbPostExtract', require('./routes/jobsdbPostExtract'));
  // app.use('/post_helloworld', require('./routes/post_helloworld'));
  app.use('/post-telegram-message', require('./routes/postTelegramMessage'));
  app.use('/telegram-send-message', require('./routes/telegramSendMessage'));
  app.use('/hw-telegram', require('./routes/hwTelegram'));
  app.use('/helloworld', require('./routes/helloworld'));

  myLogger.info('page-handler started');

  // // Start the server
  app.listen(PORT, () => {
    myLogger.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  myLogger.info('error during starting express');
  console.log(error);
}
