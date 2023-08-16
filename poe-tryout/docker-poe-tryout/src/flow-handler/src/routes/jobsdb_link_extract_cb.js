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

    var working_dir = `/share/${post_id}`;
    await createDirIfNotExists(working_dir);
    await storeJson(`${working_dir}/extract_result.json`, req_body);

    machine.context = { ...req_body, working_dir };
    await machine.extractDone();

    output = { ...output, state: 'success' };
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error };
  }

  res.send(output);
});

module.exports = router;