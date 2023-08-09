const Finity = require('finity');

const express = require('express');

// const { mySleep } = require('../utils/mySleep');
// const { jobsdbFlowMachine } = require('../state_machine/jobsdbFlowMachine');
const { worker_config } = require('../state_machine/worker_config');
const router = express.Router();

router.post('/', async (req, res) => {
  const { num } = req.body;
  res.send({ num });

  const taskParams = {
    foo: num,
  };

  const firstInstance = Finity.start(worker_config);
  firstInstance.handle('task_submitted', taskParams);

  // jobsdbFlowMachine.handle('e_extract_job_detail');

  // jobsdbFlowMachine.handle('e_extract_job_detail');
  //  jobsdbFlowMachine.handle('e_extraction_done');
  // await jobsdbFlowMachine.handle('e_summarize_job_detail');
  // await jobsdbFlowMachine.handle('e_summarize_done');
  // await jobsdbFlowMachine.handle('e_draft_email');
  // await jobsdbFlowMachine.handle('e_draft_email_done');
});

module.exports = router;
