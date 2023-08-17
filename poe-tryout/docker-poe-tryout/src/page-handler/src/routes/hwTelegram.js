const TG = require('telegram-bot-api');

const express = require('express');
const router = express.Router();

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const api = new TG({
  token: TELEGRAM_TOKEN,
});

// https://core.telegram.org/bots/api#available-methods

router.get('/', async (req, res) => {
  res.send('hwTelegram Hello, World!');

  try {
    var result = await api.getMe();
    await api.sendMessage({
      chat_id: TELEGRAM_CHAT_ID,
      text: 'hwTelegram Hello, World!',
    });

    console.log(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
