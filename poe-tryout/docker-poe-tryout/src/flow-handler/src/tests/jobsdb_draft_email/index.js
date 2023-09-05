const fetch = require('node-fetch');

const SAMPLE_PREPROMPTS = [
  'Forget everything and start a new talk.',
  `
I will input the summary of the position, 
can you draft me a cover letter ? 
Please try to make your summary in less than 100 words.
`.trim(),
  `
Louislabs company is hiring a validation engineer. 
The key responsibilities include assisting in planning and executing qualification and validation activities, 
as well as preparing qualification protocols and reports for production equipment, facilities, and utilities. 
The desired qualification is a bachelor's degree in Engineering, Pharmaceutical, or a related science discipline, 
and fresh graduates are welcome to apply.
`.trim(),
];

const SAMPLE_QUESTIONS = [
`
Please help to draft a email describing where do you live in less than 50 words.\n
Please output the content in Markdown format.
`
];

const payload = {
  preprompts: SAMPLE_PREPROMPTS,
  question_list: SAMPLE_QUESTIONS,
  callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
};

// NOTE: expecting calling from poe-scheduler to flow-handler
const payload1 = {
  hello: 'world',
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_draft_email', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.json());

    // const res_json = await response.json();
    // console.log({ res_json });
  });

console.log('done');
