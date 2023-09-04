const fetch = require('node-fetch');
const summarize_url = 'http://flow-handler:3000/jobsdb_flow_summarize';

// const Joi = require('joi');
// const fs = require('fs');
// const { storeJson } = require('../../../utils/storeJson');
// const { myLogger } = require('../../../utils/myLogger');
// const { calculateMD5 } = require('../../../utils/calculateMD5');
// const { inputSchema } = require('./inputSchema');
// const ExtractPrompts = require('./ExtractPrompts');
// const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];
// const JOB_TITLE_UNDEFINED = 'JOB_TITLE_UNDEFINED';
// const INPUT_FROM_CONTEXT_IS_NOT_VALID = 'INPUT_FROM_CONTEXT_IS_NOT_VALID';

async function postToSummarize(input_to_summarize) {
  await fetch(summarize_url, {
    method: 'post',
    body: JSON.stringify(input_to_summarize),
    headers: { 'Content-Type': 'application/json' },
  });
}

module.exports = { postToSummarize };
