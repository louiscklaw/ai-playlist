const fetch = require('node-fetch');

const body = {
  preprompts: [
    "say 'preprompt1' to me",
    "say 'preprompt2' to me"
  ],
  question_list: [
    "say 'question 1' to me", 
    "say 'question 2' to me"
  ],
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch(
      'http://poe-scheduler-api:3002/ask_poe', 
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const res_json = await response.json();
    console.log({ res_json });
  });
