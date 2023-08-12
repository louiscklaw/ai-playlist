const { myLogger } = require('../utils/myLogger');
const { jobsdbPoeDraftEmailCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const express = require('express');
const router = express.Router();

// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_flow_summarize_cb
router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: { input: {} }, error: {} };
  var req_body = req.body;
  output.debug = { input: req_body };

  // assemble the new context
  var { output: draft_email_output, context } = req_body;
  context = { ...context, poe_result: { draft_email: draft_email_output } };

  try {
    myLogger.info('receive callback from draft email ');
    output.state = 'start';

    var machine = new jobsdbPoeDraftEmailCbMachine();

    machine.context = context;

    // NOTE: current store result is the end,
    // so no further processing is required
    await machine.onStoreResult();

    output.state = 'success';
  } catch (error) {
    output.state = 'error';
    output.error = error;
    myLogger.error({ output });
  }

  res.send(output);

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
