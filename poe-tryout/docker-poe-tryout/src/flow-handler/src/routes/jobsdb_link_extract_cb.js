const express = require('express');
const { jobsFoundCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');
const { storeJson } = require('../utils/storeJson');
const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };
  var req_body = req.body;
  
  try {
    // console.log(req.body);
    // console.log(__filename);
    console.log('receive callback from link extract ');
    output.state = 'start';

    var machine = new jobsFoundCbMachine();
    machine.context = req_body;

    await machine.extractDone();
    await storeJson('/share/helloworld/extract_result.json', req_body);

    output = { ...output, state: 'success' };

  } catch (error) {
    console.log(error);
    output = {...output, state: 'error', error };
  }
  
  res.send(output);

});

module.exports = router;
