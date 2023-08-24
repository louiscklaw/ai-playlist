// TEST: src/flow-handler/src/tests/jobsdb_flow_summarize/index.js

const express = require('express');

// const { mySleep } = require('../utils/mySleep');
const { jobsdbPoeSummarizeMachine } = require('../state_machine/jobsdb/jobsdbMachine');
const { myLogger } = require('../utils/myLogger');

const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'init', debug: { input: {} }, error: "" };
  var req_body = req.body;

  try {
    myLogger.info('summarize called');
    output = { ...output, state: 'start', debug: req_body };

    //   // NOTE: containue from summiarie done state
    var machine = new jobsdbPoeSummarizeMachine();

    machine.context = { req_body };
    await machine.poeSummarize();

    output = { ...output, state: 'scheduled' };
  } catch (error) {
    myLogger.error("%o",{ error });
    // output.state = 'error';
    // output.error = error;

    output = { ...output, state: 'error', error: JSON.stringify(error) };
  }
  res.send(output);
});

module.exports = router;
