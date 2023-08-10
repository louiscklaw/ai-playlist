const express = require('express');

// const { mySleep } = require('../utils/mySleep');
const { jobsdbPoeCallack } = require('../state_machine/jobsdb/jobsdbMachine');

const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'init', debug: { input: {} }, error: {} };
  var req_body = req.body;
  output.debug = { input: req_body };
  console.log({req_body})

  // req_body contains the answer from poe w.r.t. question.

  try {
    console.log('receive callback from poe ');
    output.state = 'start';

    var jobsdb_poe_cb = new jobsdbPoeCallack({
      
    });

    await jobsdb_poe_cb.summarize();
    await jobsdb_poe_cb.summarizeDone();
    await jobsdb_poe_cb.draftEmail();
    await jobsdb_poe_cb.draftEmailDone();

    output.state = 'success';
  } catch (error) {
    console.log({error})
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
