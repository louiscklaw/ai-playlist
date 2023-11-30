const express = require('express');
const router = express.Router();

const { jobsdbPoeDraftEmailMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const { myLogger } = require('../utils/myLogger');

// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_draft_email
router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: { input: {} }, error: '' };

  try {
    myLogger.info('init draft email ');
    var req_body = req.body;
    output = { ...output, state: 'start', debug: req_body };
    // output.state = 'start';

    var machine = new jobsdbPoeDraftEmailMachine();

    // NOTE: current store result is the end,
    // so no further processing is required
    machine.context = { req_body };
    await machine.poeDraftEmail();

    // output.state = 'success';
    output = { ...output, state: 'success' };
  } catch (error) {
    // output.state = 'error';
    // output.error = error;
    // myLogger.error(output);

    console.log(error);
    output = { ...output, state: 'error', error: JSON.stringify(error) };
  }

  res.send(output);
});

module.exports = router;
