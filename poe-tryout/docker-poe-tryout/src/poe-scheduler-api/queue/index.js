'use strict';
const { gpt_endpoint, JOBPOST_ENDPOINT } = require('../constants');

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

var kue = require('kue-scheduler');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');

var Queue = kue.createQueue({
  redis: { host: 'redis', port: 6379 },
});
Queue.clear();

// async function createDirIfNotExists(chatgpt_output_filename) {
//   try {
//     await fs.mkdirSync(chatgpt_output_filename);
//   } catch (error) {
//     console.log(`${chatgpt_output_filename} already exists`);
//   }
// }

//processing jobs
Queue.process('now', 1, async function (job, done) {
  try {
    console.log('\nProcessing job with id %s at %s', job.id, new Date());

    const { data } = job;
    const { jobs_id, job_post, preprompts, question_list } = data;
    const new_job_post_id = jobs_id;
    const gpt_payload = { jobs_id, preprompts, question_list };

    // // http://openbox-firefox:3000/test1
    var chatgpt_output_filename = `/share/${new_job_post_id}/chatgpt_output.json`;
    var chatgpt_summarize_result = await fetch(`${gpt_endpoint}/chatGPT/ask`, {
      method: 'post',
      body: JSON.stringify(gpt_payload),
      headers: { 'Content-Type': 'application/json' },
    });
    var chatgpt_summarize_result_json = await chatgpt_summarize_result.json();
    createDirIfNotExists(path.dirname(chatgpt_output_filename));

    await fs.writeFileSync(chatgpt_output_filename, JSON.stringify(chatgpt_summarize_result_json, null, 2), {
      encoding: 'utf8',
    });

    var update_job_state_payload = {
      state: 'job_process_done',
      chatgpt_summarize_res_json: chatgpt_summarize_result_json,
    };

    // NOTE: do long running task by this request ?
    // http://dbapi:3001/api/v1/JobPost/${new_job_id}
    var res = await fetch(`${JOBPOST_ENDPOINT}/${new_job_post_id}`, {
      method: 'patch',
      body: JSON.stringify(update_job_state_payload),
      headers: { 'Content-Type': 'application/json' },
    });
    var res_json = await res.json();
    var json_input_filename = `/share/${new_job_post_id}/input.json`;

    await createDirIfNotExists(path.dirname(json_input_filename));

    await fs.writeFileSync(json_input_filename, JSON.stringify(res_json, null, 2), { encoding: 'utf8' });

    done(null, { deliveredAt: new Date(), res_json, data });
  } catch (error) {
    if (error.code == 'ECONNREFUSED' && error.message.indexOf('openbox-firefox') > -1) {
      done(new Error('the openbox-firefox server is not already, schedule retry'));
    } else {
      console.log(error.code);
      console.log(error.message);
      done(new Error('not handled error found, schedule retry'));
    }
  } finally {
  }
});

//listen on scheduler errors
Queue.on('schedule error', function (error) {
  //handle all scheduling errors here
  console.log(error);
  console.log('blablabla');
});

//listen on success scheduling
Queue.on('schedule success', function (job) {
  //a highly recommended place to attach
  //job instance level events listeners

  // console.log({ QueueInactiveCount: Queue.inactiveCount() });
  Queue.inactiveCount((err, count) => {
    console.log({
      state: 'Queue schedule success',
      QueueInactiveCount: count,
    });
  });

  job
    .on('complete', function (result) {
      // console.log('Job completed with data ', result)
      console.log('Dequeue job', job.id);
      Queue.removeJob(job);
    })
    .on('failed attempt', function (errorMessage, doneAttempts) {
      console.log('Job failed');
    })
    .on('failed', function (errorMessage) {
      console.log('Job failed');
    })
    .on('progress', function (progress, data) {
      console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
    });
});

module.exports = { Queue };
