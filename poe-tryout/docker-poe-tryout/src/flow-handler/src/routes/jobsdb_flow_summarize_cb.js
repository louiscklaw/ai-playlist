const fs = require('fs'),
  path = require('path');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

const { jobsdbPoeSummarizeCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

// const { mySleep } = require('../utils/mySleep');
const express = require('express');
const { storeJson } = require('../utils/storeJson');
const { myLogger } = require('../utils/myLogger');
const { calculateMD5 } = require('../utils/calculateMD5');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const router = express.Router();

// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_flow_summarize_cb
router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };
  var req_body = req.body;
  output = { ...output, debug: { input: { ...req_body } } };

  var { working_dir } = req.body;
  myLogger.info(working_dir);
  if (!working_dir) {
    myLogger.warn('self testing ? working_dir undefined');
    working_dir = `/share/testing`;
    myLogger.warn(`fallback to default working_dir ${working_dir}`);
  }

  try {
    myLogger.info('receive callback from poe summarize ');
    // output.state = 'start';
    output = { ...output, state: 'start', debug: req_body };

    // NOTE: containue from summiarie done state
    var machine = new jobsdbPoeSummarizeCbMachine();

    await storeJson(`${working_dir}/300_summarize_result.json`, req_body);

    machine.context = { ...req_body, working_dir };
    await machine.poeSummarizeDone();

    // output.state = 'success';
    output = { ...output, state: 'success' };
  } catch (error) {
    myLogger.error(JSON.stringify(error));

    output = { ...output, state: 'error', error: JSON.stringify(error) };

    await createDirIfNotExists(ERROR_LOG_DIR);
    var filename = `${ERROR_LOG_DIR}/jobsdb_flow_summarize_cb.json`;
    fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

    myLogger.error(JSON.stringify(error));
  }

  res.send(output);
});

module.exports = router;
