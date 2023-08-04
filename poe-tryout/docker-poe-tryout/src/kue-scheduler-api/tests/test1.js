const fetch = require('node-fetch');

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`writing log ${i}...`);
    const job_post = {
      job_link: 'http://www.google.com',
      position: 'info',
      description: 'log comment ?',
      state: 'job_found',
    };

    const add_db_response = await fetch('http://localhost:3001/api/v1/JobPost', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(job_post),
      state: 'JOB_POST_FOUND',
    });
    const db_json = await add_db_response.json();
    const new_job_post_id = db_json._id;

    var payload = { new_job_post_id, job_post }
    const process_response = await fetch('http://localhost:3002/process_new_job_post', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const process_res_json = await process_response.json();
    console.log({ db_json, payload, process_res_json });
  });
