const fetch = require('node-fetch');
const { getRandomInt } = require('../../../utils/getRandomInt');
// const string_links = require('./string_links');

// const body = {
//   version: '1.0',
//   title: 'JOBSDB_FOUND_NEW_JOB-http://bait:8080/jobsdb/hk/en/job/list_jobsdb.html',
//   message: string_links,
//   attachments: [],
//   type: 'info',
// };

const body = {
  "version":"1.0",
  "title":"JOBSDB_FOUND_NEW_JOB-http://bait:8080/jobsdb/hk/en/job/list_jobsdb.html",
  "message":`(added)       https://www.glassdoor.com.hk/partner/jobListing.htm?pos=101&ao=1136043&s=58&guid=0000018a69a82afabc45c691bdb2fcc1&src=GD_JOB_AD&t=SR&vt=w&cs=1_a913ff4e&cb=1693989743651&jobListingId=1008854149947&jrtk=5-pdx1-0-1h9kqgaqekolh800-6a9ea41df3db5659${getRandomInt(100,1)}\n(added)       https://www.glassdoor.com.hk/partner/jobListing.htm?pos=101&ao=1136043&s=58&guid=0000018a69a82afabc45c691bdb2fcc1&src=GD_JOB_AD&t=SR&vt=w&cs=1_a913ff4e&cb=1693989743651&jobListingId=1008854149947&jrtk=5-pdx1-0-1h9kqgaqekolh800-6a9ea41df3db5659\n`,
  "attachments":[],
  "type":"info"
};

(async ()=>{
  const response = await fetch('http://diff-handler:3000/glassdoor_diff_handler', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'content-type': 'application/json' },
  });

  const res_json = await response.json();
  console.log({ res_json });
})();
