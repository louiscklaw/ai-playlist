const express = require('express');
const router = express.Router();

const { tgSendMarkDownAlert } = require('../utils/tgApi');
const { myLogger } = require('../utils/myLogger');
const { storeErrorJson } = require('../utils/storeErrorJson');

const SEND_MESSAGE_FAILED = 'SEND_MESSAGE_FAILED';
const SEND_MESSAGE_DONE = 'SEND_MESSAGE_DONE';
const SEND_MESSAGE_INIT = 'SEND_MESSAGE_INIT';

// https://core.telegram.org/bots/api#available-methods

// saintize text to markdown compatable text string
function saintizeText(in_text) {
  return in_text.replace(/\./g,'\\.')
    .replace(/\-/g,'\\-')
    .replace(/_/g,'\\_')

}

router.post('/', async (req, res) => {
  var output = { state: SEND_MESSAGE_INIT, debug: req.body, error: '' };

  try {
    var { text } = req.body;
    var saintized_text = saintizeText(text);

    await tgSendMarkDownAlert(saintized_text);

    output = { ...output, state: SEND_MESSAGE_DONE };
  } catch (error) {
    output = { ...output, state: SEND_MESSAGE_FAILED, error: JSON.stringify(error) };
    myLogger.error('%o', { output });

    storeErrorJson(output, '/logs/error/page-handler');
  }

  res.send(output);
});

module.exports = router;
