const { jobsdbPoeSummarizeCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

// const { mySleep } = require('../utils/mySleep');
const express = require('express');
const { storeJson } = require('../utils/storeJson');
const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };
  var req_body = req.body;
  output = { ...output, debug: { input: { ...req_body } } };
  var { working_dir } = req.body;

  try {
    console.log('receive callback from poe summarize ');
    // output.state = 'start';
    output = { ...output, state: 'start', debug: req_body };

    // NOTE: containue from summiarie done state
    var machine = new jobsdbPoeSummarizeCbMachine();

    await storeJson(`${working_dir}/summarize_result.json`, req_body);

    machine.context = { ...req_body, working_dir };
    await machine.poeSummarizeDone();

    // output.state = 'success';
    output = { ...output, state: 'success' };
  } catch (error) {
    console.log({ error });
    // output.state = 'error';
    // output.error = error;

    output = { ...output, state: 'error', error: error.message };
  }

  res.send(output);
});

module.exports = router;
