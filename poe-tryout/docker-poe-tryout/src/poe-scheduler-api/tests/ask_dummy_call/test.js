const fetch = require('node-fetch');

const body = {
  preprompts: ['a apple is a fruit in red', 'a apple is a orange in orange', 'a apple is a banana in yellow'],
  question_list: [
    'using less than 10 words, describe apple',
    'using less than 10 words, describe orange',
    'using less than 10 words, describe banana',
  ],
  callback_url: 'http://poe-scheduler-api:3002/done',
  context: {
    name:'helloworld',
    process:'in between',
    value:'dummy value'
  }
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const url = 'http://poe-scheduler-api:3002/ask_dummy_call';
    // const url = 'http://poe-scheduler-api:3002/helloworld';
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    console.log({ res_json });
  });
