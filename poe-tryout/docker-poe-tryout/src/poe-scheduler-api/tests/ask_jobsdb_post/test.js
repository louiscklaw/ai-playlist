const fetch = require('node-fetch');

const body = {
  jobs_id: 'blablabla',
  job_post: 'we are employing a teacher',
  preprompts: ['we are employing a teacher, understand ?'],
  question_list: ['what is the post employing?'],
};

Array(3)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://localhost:3002/ask_jobsdb_post', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    console.log({ res_json });
  });
