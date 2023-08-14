const express = require('express');

// const { mySleep } = require('../utils/mySleep');
const { jobsdbPoeSummarizeMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'init', debug: { input: {} }, error: {} };
  var req_body = req.body;
  output.debug = { input: req_body };
  console.log(output);

  try {
    console.log('summarize called');
    output.state = 'start';

    // NOTE: containue from summiarie done state
    var jobsdb_poe_cb = new jobsdbPoeSummarizeMachine();

    await jobsdb_poe_cb.summarize();

    // NOTE: for debug
    // await jobsdb_poe_cb.poeDraftEmailDone();
    // await jobsdb_poe_cb.onStoreResult();
    // NOTE: draft email done handled using callback_url

    output.state = 'success';
  } catch (error) {
    console.log({ error });
    output.state = 'error';
    output.error = error;
  } finally {
    res.send(output);
  }

  // const { num, instance, jobsdb_job_url, post_id } = req.body;
  // res.send({ state: 'scheduled', url: jobsdb_job_url });

  // console.log(jobsdb_machine.state, jobsdb_machine.context.instance);

  // try {
  //   // await jobsdb_machine.extractJobDetail();
  //   // await jobsdb_machine.extractDone();
  //   await jobsdb_machine.askPoe();
  //   await jobsdb_machine.askPoeDone();
  // } catch (error) {
  //   console.log({ error, flow_state: jobsdb_machine.state });
  // }
});

module.exports = router;
