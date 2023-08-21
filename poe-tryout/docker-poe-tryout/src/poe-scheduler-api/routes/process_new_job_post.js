const express = require('express');
const router = express.Router();

const { ERROR_ADDING_QUEUE } = require('../constants/error');
const { STATE_INIT, STATE_SCHEDULED } = require('../constants/states');

const { Queue } = require('../queue');
const { myLogger } = require('../utils/myLogger');

router.post('/', async (req, res) => {
  var state = STATE_INIT;
  var err_msg = {};

  try {
    myLogger.info('/process_new_job_post');

    const req_body = req.body;
    const { jobs_id, job_post, preprompts, question_list, callback_url } = req_body;

    // //prepare a job to perform
    // //dont save it
    var job = Queue.createJob('poe', {
      jobs_id,
      job_post,
      preprompts,
      question_list,
      callback_url,
    })
      .attempts(5)
      .backoff({ delay: 15 * 1000, type: 'fixed' })
      .priority('normal');

    Queue.now(job);
    state = STATE_SCHEDULED;
  } catch (error) {
    state = ERROR_ADDING_QUEUE;
    err_msg = error;
  } finally {
    res.send({ state, err_msg });
  }
});

module.exports = router;
