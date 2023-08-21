const TG = require('telegram-bot-api');

const express = require('express');
const router = express.Router();

const { TELEGRAM_TOKEN, TELEGRAM_CHAT_ID } = process.env;

const api = new TG({
  token: TELEGRAM_TOKEN,
});

const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
const SEND_MESSAGE_DONE = 'SEND_MESSAGE_DONE';

// https://core.telegram.org/bots/api#available-methods

// saintize text to markdown compatable text string
function saintizeText(in_text) {
  return in_text.replace(/\./g,'\\.')
    .replace(/\-/g,'\\-')
    .replace(/_/g,'\\_')

}

router.post('/', async (req, res) => {
  var output = { state: 'init', debug: req.body, error: {} };

  try {
    var { text } = req.body;
    var saintized_text = saintizeText(text);

    // var result = await api.getMe()
    await api.sendMessage({
      chat_id: TELEGRAM_CHAT_ID,
      text: saintized_text,
      parse_mode: 'MarkdownV2',
    });

    output = { ...output, state: SEND_MESSAGE_DONE, debug: req.body };
  } catch (error) {
    console.log(error);
    output = { ...output, state: SEND_MESSAGE_FAILED, error: error.message };
    
    console.log({output})
  }

  res.send(output);
});

module.exports = router;
