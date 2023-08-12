const {myLogger} = require('../utils/myLogger');
const { jobsdbPoeDraftEmailCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const express = require('express');
const router = express.Router();

// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_flow_summarize_cb
router.post('/', async (req, res) => {
  var output = { state: 'init', debug: { input: {} }, error: {} };
  var req_body = req.body;
  output.debug = { input: req_body };

  try {
    myLogger.log('info',{message: 'receive callback from draft email '});
    output.state = 'start';

    var machine = new jobsdbPoeDraftEmailCbMachine({});

    myLogger.info(JSON.stringify(req_body))
    machine.context.draft_email_result = req_body;

    // NOTE: current store result is the end,
    // so no further processing is required
    await machine.onStoreResult();

    myLogger.log('info',{message: {output}})
    output.state = 'success';
  } catch (error) {
    myLogger.log('info',{message: { error }});
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
