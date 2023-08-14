const express = require('express');
const { jobsFoundCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');
const { storeJson } = require('../utils/storeJson');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };
  var req_body = req.body;

  try {
    console.log('receive callback from link extract ');
    output.state = 'start';

    var machine = new jobsFoundCbMachine();
    machine.context = req_body;
    const { post_id } = req_body;

    await machine.extractDone();
    
    await createDirIfNotExists(`/share/${post_id}`);
    await storeJson(`/share/${post_id}/extract_result.json`, req_body);

    output = { ...output, state: 'success' };
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error };
  }

  res.send(output);
});

module.exports = router;
