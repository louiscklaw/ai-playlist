const express = require('express');
const router = express.Router();
const { jobsFoundMachine } = require('../state_machine/jobsdb/jobsdbMachine');

router.post('/', async (req, res) => {
  var output = { state: 'INIT', extract_result: {}, debug: {}, error: {} };

  try {
    var req_body = req.body;
    output = { ...output, state: 'start', debug: req_body };

    var machine = new jobsFoundMachine();
    machine.context = { req_body };
    await machine.extractJobDetail();

    output = { ...output, state: 'scheduled' };
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error };
  }

  res.send(output);
});

module.exports = router;
