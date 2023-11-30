const express = require('express');
const router = express.Router();

const { ERROR_ADDING_QUEUE } = require('../constants/error');
const { STATE_INIT, STATE_SCHEDULED, STATE_START, STATE_DONE } = require('../constants/states');

const { Queue } = require('../queue');
const { myLogger } = require('../utils/myLogger');

router.post('/', async (req, res) => {
  var output = { state: STATE_INIT, debug: {}, error: "" };
  var err_msg = {};

  try {
    myLogger.info('/postHelloworld');
    const req_body = req.body;
    output = { ...output, state: 'start', debug: req_body };

    // process

    const { hello } = req_body;
    myLogger.info('%o', { hello });
    output.debug = { input: req_body };

    output.state = STATE_DONE;
    output = { ...output, state: STATE_DONE };
  } catch (error) {
    myLogger.info('%o', { error });
    // output.state = 'error';
    // output.error = error;

    output = { ...output, state: ERROR_ADDING_QUEUE, error: JSON.stringify(error) };
  }

  res.send(output);
});

module.exports = router;
