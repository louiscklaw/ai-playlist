const fetch = require('node-fetch');

const body = {
  version: '1.0',
  title: 'JOBSDB_FOUND_NEW_JOB-http://bait:8080/jobsdb/hk/en/job/list_jobsdb.html',
  message:
    '(added)       /hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402?token=0~c7001e72-05f1-43f0-a9e0-ed4ded06b90f§ionRank=25&jobId=jobsdb-hk-job-100003010532402',
  attachments: [],
  type: 'info',
};

// const body = {
//   "version":"1.0",
//   "title":"JOBSDB_FOUND_NEW_JOB-http://bait:8080/jobsdb/hk/en/job/list_jobsdb.html",
//   "message":"(added)       /hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402\n(added)       /hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532404\n",
//   "attachments":[],
//   "type":"info"
// }

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://diff-handler:3000/jobsdb_diff_handler', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    });

    const res_json = await response.json();
    console.log({ res_json });
  });
