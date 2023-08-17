const express = require('express');
const { jobsFoundCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');
const { storeJson } = require('../utils/storeJson');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const router = express.Router();

router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };
  
  try {
    var req_body = req.body;
    output = { ...output, state: 'success', debug: req_body };

    const response = await fetch('http://page-handler:3000/post-telegram-message',{
      method:'post',
      body: JSON.stringify({text:'helloworld -text'}),
      headers: {'content-type': 'application/json'}
    });
    const res_json = await response.json();

    if (res_json.state != 'SEND_MESSAGE_DONE') throw new Error('error reported from page-handler endpoint')

  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error: error.message };
  }

  res.send(output);
});

module.exports = router;
