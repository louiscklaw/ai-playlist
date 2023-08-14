const express = require('express');

// const { mySleep } = require('../utils/mySleep');
const { jobsdbPoeSummarizeMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'init', debug: { input: {} }, error: {} };
  var req_body = req.body;
  output = { ...output, input: req_body };

  try {
    console.log('summarize called');
    output = { ...output, state: 'start' };

    //   // NOTE: containue from summiarie done state
    var machine = new jobsdbPoeSummarizeMachine();

    machine.context = { req_body };
    await machine.poeSummarize();

    output = { ...output, state: 'scheduled' };
  } catch (error) {
    console.log({ error });
    output.state = 'error';
    output.error = error;
  }
  res.send(output);
});

module.exports = router;
