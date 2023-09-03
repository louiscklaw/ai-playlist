const fetch = require('node-fetch');
const string_links = require('./string_links');

const body = {
  version: '1.0',
  title: 'JOBSDB_FOUND_NEW_JOB-http://bait:8080/jobsdb/hk/en/job/list_jobsdb.html',
  message: string_links,
  attachments: [],
  type: 'info',
};

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
