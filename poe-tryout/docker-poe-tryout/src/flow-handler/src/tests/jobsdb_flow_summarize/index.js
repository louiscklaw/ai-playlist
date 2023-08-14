const fetch = require('node-fetch');

// NOTE: simulate the response from poe-scheduler
const url = 'http://flow-handler:3000/jobsdb_flow_summarize'


const SAMPLE_PREPROMPTS = [
  'Forget everything and start a new talk.',
]

const SAMPLE_QUESTIONS = [
`
I will input some text, 
please try to summarize it in around 50 words
`.trim(),
`
We are louislabs company, we are hiring a validation engineer

The Key Roles and Responsibilities of this position:

  Assist in planning and executing qualification and validation activities
  Prepare qualification protocols and reports for production equipment, facilities and utilities

The Qualification and Experience needed:

  Bachelor’s degree in Engineering, Pharmaceutical or other related science discipline
  Fresh graduates are welcome
`.trim()
]

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

    console.log(await response.json())

    // const res_json = await response.json();
    // console.log({ res_json });
  });
