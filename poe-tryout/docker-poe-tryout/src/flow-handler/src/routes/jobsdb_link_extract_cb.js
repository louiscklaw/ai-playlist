const express = require('express');
const { jobsFoundCbMachine } = require('../state_machine/jobsdb/jobsdbMachine');
const { storeJson } = require('../utils/storeJson');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const router = express.Router();

const url = 'http://flow-handler:3000/jobsdb_flow_summarize';

const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];

router.post('/', async (req, res) => {
  var output = { state: 'INIT', debug: {}, error: {} };
  var req_body = req.body;

  try {
    console.log('receive callback from link extract ');
    output.state = 'start';

    var machine = new jobsFoundCbMachine();
    machine.context = req_body;
    const { post_id } = req_body;

    await machine.extractDone();

    var working_dir = `/share/${post_id}`;
    await createDirIfNotExists(working_dir);
    await storeJson(`${working_dir}/extract_result.json`, req_body);

    // proceed to summarize
    await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        working_dir,
        preprompts: SAMPLE_PREPROMPTS,
        question_list: [
          `
I will input some text, 
please try to summarize it in around 50 words
`.trim(),
          `
We are louislabs company, we are hiring a validation engineer

The Key Roles and Responsibilities of this position:

  Assist in planning and executing qualification and validation activities
  Prepare qualification protocols and SAMPLE_QUESTIONSreports for production equipment, facilities and utilities

The Qualification and Experience needed:

  Bachelor’s degree in Engineering, Pharmaceutical or other related science discipline
  Fresh graduates are welcome
`.trim(),
        ],
        callback_url: 'http://flow-handler:3000/jobsdb_flow_summarize_cb',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    output = { ...output, state: 'success' };
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error };
  }

  res.send(output);
});

module.exports = router;
