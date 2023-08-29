const TG = require('telegram-bot-api');

const express = require('express');
const router = express.Router();

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;
const { myLogger } = require('../utils/myLogger');
const { storeErrorJson } = require('../utils/storeErrorJson');
const api = new TG({ token: TELEGRAM_TOKEN });

const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
const SEND_MESSAGE_DONE = 'SEND_MESSAGE_DONE';
const SEND_MESSAGE_INIT = 'SEND_MESSAGE_INIT';

// https://core.telegram.org/bots/api#available-methods

router.get('/', async (req, res) => {
  var output = { state: SEND_MESSAGE_INIT, debug: req.body, error: '' };

  myLogger.info('telegramSendAlert called');

  try {
    // var result = await api.getMe()
    await api.sendMessage({
      chat_id: TELEGRAM_CHAT_ID,
      text: 'telegramSendAlert Hello, World!',
    });

    output = { ...output, state: SEND_MESSAGE_DONE };
  } catch (error) {
    output = { ...output, state: SEND_MESSAGE_FAILED, error: JSON.stringify(error) };

    myLogger.error(JSON.stringify(error));
    myLogger.error('%o', { output });

    storeErrorJson(output, '/logs/error/page-handler');
  }

  res.send(output);
});

module.exports = router;
