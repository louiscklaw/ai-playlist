const { myLogger } = require('../utils/myLogger');
const { jobsdbPoeDraftEmailCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');

const express = require('express');
const { storeJson } = require('../utils/storeJson');
const router = express.Router();

// NOTE: test using this -> /src/flow-handler/src/tests/jobsdb_flow_summarize_cb
router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: { input: {} }, error: {} };

  var req_body = req.body;
  output.debug = { ...output, input: req_body };

  try {
    // assemble the new context
    console.log({ req_body });
    // var { output: draft_email_output } = req_body;

    await storeJson('/share/helloworld/draft_email.json', req_body);

    myLogger.info('receive callback from draft email ');
    output.state = 'start';

    var machine = new jobsdbPoeDraftEmailCbMachine();
    machine.context = req_body;

    // NOTE: current store result is the end,
    // so no further processing is required
    await machine.onPoeDraftEmailDone();
    await machine.onStoreResult();

    output.state = 'success';
  } catch (error) {
    console.log(error);
  }

  res.send(output);
});

module.exports = router;
