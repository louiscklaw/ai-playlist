const fetch = require('node-fetch');

// jobsdb_job_url:'http://bait:8080/jobsdb/hk/en/job/validation-assistant-100003010509868.html',
// jobsdb_job_url:'https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868',

// jobsdb_job_url: `https://hk.jobsdb.com/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402`,

// /hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402
const payload = {
  jobsdb_job_url: `https://hk.jobsdb.com/hk/en/job/qa-engineer-automation-100003010496802`,
  callback_url: 'http://flow-handler:3000/jobsdb_link_extract_cb',
};

// NOTE: expecting calling from poe-scheduler to flow-handler

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_link_extract', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.json());

    // const res_json = await response.json();
    // console.log({ res_json });
  });

console.log('done');
