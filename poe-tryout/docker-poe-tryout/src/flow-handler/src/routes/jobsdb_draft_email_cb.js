const { myLogger } = require('../utils/myLogger');
const { jobsdbPoeDraftEmailCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const express = require('express');
const { storeJson } = require('../utils/storeJson');
const router = express.Router();

const fs = require('fs');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');

// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_flow_summarize_cb
router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: "" };
  myLogger.info('receive callback from draft email ');

  try {
    var req_body = req.body;
    output = { ...output, state: 'start', debug: req_body };

    // assemble the new context
    var { working_dir } = req_body;
    if (!working_dir) {
      myLogger.info('working_dir is not defined, default to /share/testing');
      working_dir = '/share/testing';
    }
    await createDirIfNotExists(working_dir);
    await storeJson(`${working_dir}/draft_email.json`, req_body);

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
  }

  res.send(output);
});

module.exports = router;
