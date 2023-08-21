'use strict';

const { default: fetch } = require('node-fetch');
const { JOBPOST_ENDPOINT } = require('../constants');

// NOTE: testing from host, not docker guest
// const DBAPI_HOST = 'http://localhost:3001/api/v1';
// const JOBPOST_ENDPOINT = `${DBAPI_HOST}/JobPost`;

async function writeOutputToDB(new_job_post_id, update_job_state_payload) {
  var output = {};
  try {
    myLogger.info('calling writeOutputToDB', new_job_post_id);
    var url = `${JOBPOST_ENDPOINT}/${new_job_post_id}`;
    myLogger.info('%o', { url, update_job_state_payload });

    var res = await fetch(url, {
      method: 'patch',
      body: JSON.stringify(update_job_state_payload),
      headers: { 'Content-Type': 'application/json' },
    });

    var res_json = await res.json();
    console.log(res_json);
  } catch (error) {
    console.log(error);
  } finally {
    return output;
  }
}

module.exports = { writeOutputToDB };

// async function test() {
//   await writeOutputToDB('64cfade8af6140c1953510ff', {
//     job_link: 'http://www.google.com',
//     position: 'info',
//     description: 'blablabla',
//     state: 'job_found',
//     chatgpt_summarize_res_json: {
//       json_input: {
//         question_list: [],
//       },
//       chat_history: {
//         history: [],
//       },
//     },
//   });
// }

// (async () => {
//   await test();
// })();
