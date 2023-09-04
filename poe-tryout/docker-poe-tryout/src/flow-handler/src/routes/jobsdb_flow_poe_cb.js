const express = require('express');

// const { mySleep } = require('../utils/mySleep');
const { jobsdbPoeCallack } = require('../state_machine/jobsdb/jobsdbMachine');

const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'init', debug: { input: {} }, error: "" };
  var req_body = req.body;
  output.debug = { input: req_body };
  console.log({ req_body });

  // req_body contains the answer from poe w.r.t. question.

  try {
    console.log('receive callback from poe ');
    // output.state = 'start';
    output = { ...output, state: 'start', debug: req_body };

    var jobsdb_poe_cb = new jobsdbPoeCallack({});

    await jobsdb_poe_cb.summarize();
    await jobsdb_poe_cb.summarizeDone();
    await jobsdb_poe_cb.draftEmail();
    await jobsdb_poe_cb.draftEmailDone();

    // output.state = 'success';
    output = { ...output, state: 'success' };
  } catch (error) {
    console.log({ error });
    // output.state = 'error';
    // output.error = error;

    output = { ...output, state: 'error', error: JSON.stringify(error) };
  }

  res.send(output);
});

module.exports = router;
