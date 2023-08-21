'use strict';

const fs = require('fs');
const path = require('path');
const { default: fetch } = require('node-fetch');
const { JOBPOST_ENDPOINT, SHARE_DIR } = require('../constants');
const { createDirIfNotExists } = require('./createDirIfNotExists');

// NOTE: testing from host, not docker guest
// const DBAPI_HOST = 'http://localhost:3001/api/v1';
// const JOBPOST_ENDPOINT = `${DBAPI_HOST}/JobPost`;
// const SHARE_DIR = '/workspace/ai-playlist/poe-tryout/docker-poe-tryout/src/static-share';

async function writeOutputToDirectory(new_job_post_id, chatgpt_summarize_result_json) {
  var output = {};

  try {
    var chatgpt_output_filename = `${SHARE_DIR}/${new_job_post_id}/chatgpt_output.json`;
    myLogger.info('calling writeOutputToDirectory', chatgpt_output_filename);

    await createDirIfNotExists(path.dirname(chatgpt_output_filename));

    await fs.writeFileSync(chatgpt_output_filename, JSON.stringify(chatgpt_summarize_result_json, null, 2), {
      encoding: 'utf8',
      // flags: 'wx',
    });
    var output = {
      state: 'job_process_done',
      chatgpt_summarize_res_json: chatgpt_summarize_result_json,
    };
  } catch (error) {
    console.log(error);
  }

  return output;
}

module.exports = { writeOutputToDirectory };

// async function test() {
//   await writeOutputToDirectory('64cfade8af6140c1953510ff', {
//     hello: 'world',
//   });
// }

// (async () => {
//   await test();
// })();
