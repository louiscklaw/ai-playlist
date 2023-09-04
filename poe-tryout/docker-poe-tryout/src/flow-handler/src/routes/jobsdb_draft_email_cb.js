const { myLogger } = require('../utils/myLogger');
const { jobsdbPoeDraftEmailCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const express = require('express');
const { storeJson } = require('../utils/storeJson');
const router = express.Router();

const fs = require('fs');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const { calculateMD5 } = require('../utils/calculateMD5');

const ERROR_LOG_DIR = __dirname.replace('/app', '/logs/error');

// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_draft_email_cb
router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {req_body: req.body}, error: "" };
  myLogger.info('receive callback from draft email ');

  try {
    var req_body = req.body;
    console.log(req_body)

    output = { ...output, state: 'start', debug: req_body };

    // assemble the new context
    var { working_dir } = req_body;
    if (!working_dir) {
      myLogger.info('working_dir is not defined, default to /share/testing');
      working_dir = '/share/testing';
    }
    await createDirIfNotExists(working_dir);
    await storeJson(`${working_dir}/400_draft_email.json`, req_body);

    var machine = new jobsdbPoeDraftEmailCbMachine();
    machine.context = req_body;

    await machine.poeDraftEmailDone();

    // NOTE: current store result is the end,
    // so no further processing is required
    await machine.storeResult();
    await machine.reportJobComplete();

    output = { ...output, state: 'done' };
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error: JSON.stringify(error) };

    myLogger.error('error during draft email callback...');

    await createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/jobsdb_draft_email_cb.json`;
    await fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });
    myLogger.error(filename);

    myLogger.error(JSON.stringify(error));
    throw error;
  }

  res.send(output);
});

module.exports = router;
