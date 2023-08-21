const TG = require('telegram-bot-api');

const express = require('express');
const router = express.Router();

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;
const { myLogger } = require('../utils/myLogger');
const api = new TG({ token: TELEGRAM_TOKEN });

const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
const SEND_MESSAGE_DONE = 'SEND_MESSAGE_DONE';

// https://core.telegram.org/bots/api#available-methods

router.get('/', async (req, res) => {
  var output = { state: 'init', debug: req.body, error: {} };

  myLogger.info('telegramSendMessage called');
  try {
    // var result = await api.getMe()
    await api.sendMessage({
      chat_id: TELEGRAM_CHAT_ID,
      text: 'telegramSendMessage Hello, World!',
    });

    output = { ...output, state: SEND_MESSAGE_DONE, debug: req.body };
    res.send(output);
  } catch (error) {
    output = { ...output, state: SEND_MESSAGE_FAILED, error: error.message };
    console.log(error);
    console.log({output})

  }
  res.send(output);
});

module.exports = router;
