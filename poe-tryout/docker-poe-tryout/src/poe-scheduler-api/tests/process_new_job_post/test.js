const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

const body = {
  jobs_id: 'blablabla',
  job_post: 'we are employing a teacher',
  preprompts: ['we are employing a teacher, understand ?'],
  question_list: ['what is the post employing?'],
};

Array(3)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`posting ask ${i}...`);

    const response = await fetch('http://localhost:3002/process_new_job_post', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    myLogger.info('%o', { res_json });
  });
