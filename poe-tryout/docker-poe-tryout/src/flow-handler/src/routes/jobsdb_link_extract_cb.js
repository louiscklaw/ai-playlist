const express = require('express');
const { jobsFoundCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');
const { storeJson } = require('../utils/storeJson');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const { myLogger } = require('../utils/myLogger');
const router = express.Router();

// /jobsdb_link_extract_cb
// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_link_extract_cb
router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };

  try {
    myLogger.info('receive callback from link extract ');
    var req_body = req.body;

    // myLogger.info('see below')
    // myLogger.info("%o", {req_body})

    output = { ...output, state: 'start', debug: req_body };
    // output.state = 'start';

    var machine = new jobsFoundCbMachine();
    machine.context = req_body;
    var { jobsdb_job_url, post_id } = req_body;

    var working_dir = `/share/${post_id}`;
    myLogger.info(`writing to working_dir: ${working_dir}...`);
    await createDirIfNotExists(working_dir);
    await storeJson(`${working_dir}/100_extract_result.json`, req_body);
    await storeJson(`${working_dir}/meta.json`, {
      jobsdb_job_url,
      working_dir,
    });

    // NOTE: to check if working_dir undefined
    if (!working_dir) {
      myLogger.error('working_dir undefined');
      myLogger.error('%o', { working_dir, post_id });
      throw new Error(WORKING_DIR_UNDEFINED);
    }

    machine.context = { ...req_body, working_dir };

    await machine.extractDone();

    output = { ...output, state: 'success' };
  } catch (error) {
    myLogger.info('%o', error);
    output = { ...output, state: 'error', error };
  }

  res.send(output);
});

module.exports = router;
