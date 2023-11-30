const fetch = require('node-fetch');
const { SAMPLE_PREPROMPTS, SAMPLE_QUESTIONS } = require('./questions');

// NOTE: simulate the response from poe-scheduler
const url = 'http://flow-handler:3000/jobsdb_flow_summarize';

const payload = {
  preprompts: SAMPLE_PREPROMPTS,
  question_list: SAMPLE_QUESTIONS,
  callback_url: 'http://flow-handler:3000/jobsdb_flow_summarize_cb',
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.json());

    // const res_json = await response.json();
    // console.log({ res_json });
  });
