const fetch = require('node-fetch');

var temp = {
  preprompts: [
    'Forget everything and start a new talk.',
    
  ],
  question_list: [
    'Please draft me a markdown example with "#"',
  ],
  callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
};

const payload = temp;

// NOTE: expecting calling from poe-scheduler to flow-handler

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
  });

console.log('done');
