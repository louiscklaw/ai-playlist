const { jobsdbPoeSummarizeCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

// const { mySleep } = require('../utils/mySleep');
const express = require('express');
const { storeJson } = require('../utils/storeJson');
const { myLogger } = require('../utils/myLogger');
const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };
  var req_body = req.body;
  output = { ...output, debug: { input: { ...req_body } } };

  var { working_dir } = req.body;
  myLogger.error(working_dir)
  if (!working_dir) {
    myLogger.warn('self testing ? working_dir undefined')
    working_dir = `/share/testing`
    myLogger.warn(`fallback to default working_dir ${working_dir}`)
  }

  try {
    myLogger.info('receive callback from poe summarize ');
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
    myLogger.error("%o",{ error });
    // output.state = 'error';
    // output.error = error;

    output = { ...output, state: 'error', error: error.message };
  }

  res.send(output);
});

module.exports = router;
