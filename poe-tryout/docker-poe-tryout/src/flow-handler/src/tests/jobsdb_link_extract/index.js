const fetch = require('node-fetch');

// const SAMPLE_PREPROMPTS = [
//   'Forget everything and start a new talk.',
// `
// I will input a job advertisement to you, 
// can you help me to summarize it ?
// Please try to make it in less than 100 words.
// `.trim(),
// `
// Vickmans Laboratories Ltd
// Validation Engineer(QA)
// Ngau Tau Kok
// Posted on 11-Aug-23
// Job Highlights
// `.trim()
// ]

// const SAMPLE_QUESTIONS = [
//   'please help to draft a email describing where do you live. in less than 50 words'
// ]

  // jobsdb_job_url:'https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868',
const payload = {
  jobsdb_job_url:'http://bait:8080/jobsdb/hk/en/job/validation-assistant-100003010509868.html',
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

    console.log(await response.text())

    // const res_json = await response.json();
    // console.log({ res_json });
  });

console.log('done');
