const fetch = require('node-fetch');

// jobsdb_job_url:'http://bait:8080/jobsdb/hk/en/job/validation-assistant-100003010509868.html',
// jobsdb_job_url:'https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868',
// jobsdb_job_url: `https://hk.jobsdb.com/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402`,
// /hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402

// '/hk/en/job/aml-manager-model-validation-100003010515017',
// '/hk/en/job/aml-manager-model-validation-data-analytics-100003010541477',
// '/hk/en/job/assistant-qc-supervisor-senior-qc-technician-ref.-no.%3Aaqcs-sqct-08-2023-100003010507061',
// '/hk/en/job/assistant-vice-president-credit-risk-modeling-analytics-100003010513389',
// '/hk/en/job/technical-officer-100003010512160',
// '/hk/en/job/validation-assistant-100003010526705',
// '/hk/en/job/actuarial-intern-valuation-2024-jan-jun-100003010532402',

const link_list = [
  '/hk/en/job/validation-engineer-qa-100003010527848',
];

const payload_1 = {
  jobsdb_job_url: `https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868`,
  callback_url: 'http://flow-handler:3000/jobsdb_link_extract_cb',
};

const payload = url => {
  return {
    jobsdb_job_url: `https://hk.jobsdb.com${url}`,
    callback_url: 'http://flow-handler:3000/jobsdb_link_extract_cb',
  };
};

const temp = link_list.map(l => payload(l));

// NOTE: expecting calling from poe-scheduler to flow-handler

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    temp.forEach(async t => {
      const response = await fetch('http://flow-handler:3000/jobsdb_link_extract', {
        method: 'post',
        body: JSON.stringify(t),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(await response.json());
    });

    // const res_json = await response.json();
    // console.log({ res_json });
  });

console.log('done');
