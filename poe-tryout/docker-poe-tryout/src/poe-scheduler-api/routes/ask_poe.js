const express = require('express');
const router = express.Router();

const { ERROR_ADDING_QUEUE } = require('../constants/error');
const { STATE_INIT, STATE_SCHEDULED } = require('../constants/states');

const { Queue } = require('../queue');
const { myLogger } = require('../utils/myLogger');

router.post('/', async (req, res) => {
  var state = STATE_INIT;
  var output = { state, error: {} };

  try {
    myLogger.info(`/${__filename}`);
    const req_body = req.body;
    const { working_dir, preprompts, question_list, callback_url } = req_body;

    //prepare a job to perform
    //dont save it
    var job = Queue.createJob('poe', {
      working_dir,
      preprompts,
      question_list,
      callback_url,
    })
      .attempts(5)
      .backoff({ delay: 15 * 1000, type: 'fixed' })
      .priority('normal');

    Queue.now(job);
    output = { ...output, state: STATE_SCHEDULED };
  } catch (error) {
    output = { ...output, state: ERROR_ADDING_QUEUE, error };
  }

  res.send(output);
});

module.exports = router;
