const fetch = require('node-fetch');

const body = {
  jobs_id: 'blablabla',
  job_post: 'we are employing a teacher',
  preprompts: ['we are employing a teacher, understand ?'],
  question_list: ['what is the post employing?'],
};

// 'https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868'
// http://flow-handler:3005/jobsdb_flow_poe_callback

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_flow_poe_callback', {
      method: 'post',
      body: JSON.stringify({ 
        hello:'world'
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    console.log({ res_json });
  });

console.log('done');
