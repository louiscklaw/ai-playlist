const express = require('express');
const router = express.Router();

const { Queue } = require('../queue');

router.post('/', async (req, res) => {
  console.log('/process_new_job_post');

  const req_body = req.body;
  const { jobs_id, job_post, preprompts, question_list } = req_body;

  // //prepare a job to perform
  // //dont save it
  var job = Queue.createJob('now', {
    jobs_id,
    job_post,
    preprompts,
    question_list,
  })
    .attempts(5)
    .backoff({ delay: 60000, type: 'fixed' })
    .priority('normal');

  Queue.now(job);

  res.send({ state: 'schedued' });
});

module.exports = router;
