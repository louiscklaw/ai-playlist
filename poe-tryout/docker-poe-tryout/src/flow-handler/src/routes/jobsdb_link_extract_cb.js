const express = require('express');
const { jobsFoundCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');
const { storeJson } = require('../utils/storeJson');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const { myLogger } = require('../utils/myLogger');
const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };

  try {
    myLogger.info('receive callback from link extract ');
    var req_body = req.body;
    myLogger.error('see below')
    myLogger.info("%o", {req_body})

    output = { ...output, state: 'start', debug: req_body };
    // output.state = 'start';

    var machine = new jobsFoundCbMachine();
    machine.context = req_body;
    const { jobsdb_job_url, post_id } = req_body;

    var working_dir = `/share/${post_id}`;
    myLogger.info(`writing to ${working_dir}...`);
    await createDirIfNotExists(working_dir);
    await storeJson(`${working_dir}/extract_result.json`, req_body);
    await storeJson(`${working_dir}/meta.json`, {
      jobsdb_job_url, working_dir
    });

    machine.context = { ...req_body, working_dir };

    await machine.extractDone();

    output = { ...output, state: 'success' };
  } catch (error) {
    myLogger.info(error);
    output = { ...output, state: 'error', error: error.message };
  }

  res.send(output);
});

module.exports = router;
