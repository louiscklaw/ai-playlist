const { myLogger } = require('../utils/myLogger');
const { jobsdbPoeDraftEmailMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const express = require('express');
const router = express.Router();

// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_flow_summarize_cb
router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: { input: {} }, error: {} };
  var req_body = req.body;

  try {
    output.state = 'start';
    myLogger.info('receive callback from draft email ');

    var machine = new jobsdbPoeDraftEmailMachine();

    // NOTE: current store result is the end,
    // so no further processing is required
    machine.context = { req_body };
    await machine.poeDraftEmail();

    output.state = 'success';
  } catch (error) {
    output.state = 'error';
    output.error = error;
    console.log(error);
    // myLogger.error(output);
  }

  res.send(output);
});

module.exports = router;
