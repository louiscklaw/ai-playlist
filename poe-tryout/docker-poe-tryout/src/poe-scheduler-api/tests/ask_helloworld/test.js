const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

const body = {
  preprompts: ['What is orange? please make your answer in below 20 words.'],
  question_list: ['What is banana? please make your answer in below 20 words.'],
  callback_url: 'http://poe-scheduler-api:3002/done',
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`posting ask ${i}...`);
    const url = 'http://poe-scheduler-api:3002/ask_jobsdb_post';
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    myLogger.info('%o', { res_json });
  });
