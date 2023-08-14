const { jobsdbPoeSummarizeCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

// const { mySleep } = require('../utils/mySleep');
const express = require('express');
const { storeJson } = require('../utils/storeJson');
const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'init', debug: { input: {} }, error: {} };
  var req_body = req.body;
  output.debug = { input: req_body };

  try {
    console.log('receive callback from poe summarize ');
    output.state = 'start';

    console.log({ req_body });

    // NOTE: containue from summiarie done state
    var machine = new jobsdbPoeSummarizeCbMachine();
    machine.context = req_body;

    await machine.poeSummarizeDone();
    await storeJson('/share/helloworld/summarize_result.json', req_body);

    output.state = 'success';
  } catch (error) {
    console.log({ error });
    output.state = 'error';
    output.error = error;
  } finally {
    res.send(output);
  }
});

module.exports = router;
