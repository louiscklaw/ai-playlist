const fetch = require('node-fetch');
const { myLogger } = require('../../../utils/myLogger');

const urls = [
  // 'http://bait:8080/jobsdb/hk/en/job/missing_jobtitle-10001000.html',
  'https://hk.jobsdb.com/hk/en/job/validation-engineer-qa-100003010527848',
  // 'https://hk.jobsdb.com',
  // 'https://hk.jobsdb.com/',
];

urls.map(async (v, i) => {
  myLogger.info(`posting ask ${i}...`);

  // route -> src/jobsdb-link-extractor/src/routes/jobsdbPostExtract.js
  const response = await fetch('http://jobsdb-link-extractor:3000/jobsdbPostExtract', {
    method: 'post',
    body: JSON.stringify({
      url: urls[i],
      jobsdb_job_url: urls[i],
      callback_url: 'https://www.example.com',
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  const res_json = await response.json();
  const { state } = res_json;
  myLogger.info('%o', { state });
});
