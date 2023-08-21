// NOTE: expected running on host and not inside docker container
const fetch = require('node-fetch');

var gpt_payload = {
  jobs_id: 'blablabla',

  question_list: ["say 'hello 1' to me", "say 'hello 2' to me", "say 'hello 3' to me"],
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`writing log ${i}...`);
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

    var payload = { new_job_post_id, job_post, gpt_payload };
    const process_response = await fetch('http://localhost:3002/process_new_job_post', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const process_res_json = await process_response.json();
    myLogger.info('%o', { process_res_json });

    // myLogger.info("%o", {
    //   // db_json,
    //   payload,
    //   process_res_json
    // });
  });
