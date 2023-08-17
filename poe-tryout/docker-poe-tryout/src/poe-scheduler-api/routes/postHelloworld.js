const express = require('express');
const router = express.Router();

const { ERROR_ADDING_QUEUE } = require('../constants/error');
const { STATE_INIT, STATE_SCHEDULED, STATE_START, STATE_DONE } = require('../constants/states');

const { Queue } = require('../queue');

router.post('/', async (req, res) => {
  var output = { state: STATE_INIT, debug: {}, error: {} };
  var err_msg = {};

  try {
    console.log('/postHelloworld');
    const req_body = req.body;
    output = { ...output, state: 'start', debug: req_body };

    // process

    const { hello } = req_body;
    console.log({ hello });
    output.debug = { input: req_body };

    output.state = STATE_DONE;
    output = { ...output, state: STATE_DONE };
  } catch (error) {
    console.log({ error });
    // output.state = 'error';
    // output.error = error;

    output = { ...output, state: ERROR_ADDING_QUEUE, error: error.message };
  }

  res.send(output);
});

module.exports = router;
