const fetch = require('node-fetch');
// const string_links = require('./string_links');

// const body = {
//   version: '1.0',
//   title: 'JOBSDB_FOUND_NEW_JOB-http://bait:8080/jobsdb/hk/en/job/list_jobsdb.html',
//   message: string_links,
//   attachments: [],
//   type: 'info',
// };

// const body = {
//   "version":"1.0",
//   "title":"JOBSDB_FOUND_NEW_JOB-http://bait:8080/jobsdb/hk/en/job/list_jobsdb.html",
//   "message":"(added)       /hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402\n(added)       /hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532404\n",
//   "attachments":[],
//   "type":"info"
// }

(async ()=>{
  const response = await fetch('http://diff-handler:3000/glassdoor_diff_handler/helloworld', {
    method: 'GET',
  });

  const res_json = await response.json();
  console.log({ res_json });
})()