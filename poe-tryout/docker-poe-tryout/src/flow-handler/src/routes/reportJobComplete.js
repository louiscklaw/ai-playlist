const express = require('express');

const router = express.Router();

const { postTelegramMessage } = require('../utils/postTelegramMessage');

router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };

  try {
    var req_body = req.body;
    output = { ...output, state: 'success', debug: req_body };

    const response = await postTelegramMessage('helloworld-text-blablabla');
    const res_json = await response.json();

    if (res_json.state != 'SEND_MESSAGE_DONE') throw new Error('error reported from page-handler endpoint');
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error: error.message };
  }

  res.send(output);
});

module.exports = router;
