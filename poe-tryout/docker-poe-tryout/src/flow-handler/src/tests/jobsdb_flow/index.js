const fetch = require('node-fetch');

const body = {
  jobs_id: 'blablabla',
  job_post: 'we are employing a teacher',
  preprompts: ['we are employing a teacher, understand ?'],
  question_list: ['what is the post employing?'],
};

('https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868');

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_flow', {
      method: 'post',
      body: JSON.stringify({
        num: i,
        instance: i,
        post_id: 'sample_jobsdb_post',
        jobsdb_job_url: 'http://bait:8080/sample_jobsdb_post.html',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    console.log({ res_json });
  });

console.log('helloworld');
