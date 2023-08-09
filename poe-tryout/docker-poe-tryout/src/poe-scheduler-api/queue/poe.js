'use strict';
const path = require('path');

const { gpt_endpoint, getRandomOpenboxHost, JOBPOST_ENDPOINT } = require('../constants');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const { writeOutputToDB } = require('../utils/writeOutputToDB');
const { writeOutputToDirectory } = require('../utils/writeOutputToDirectory');
const { mySleep } = require('../utils/mySleep');

module.exports = Queue => {
  console.log('poe Queue init');

  Queue.process('poe', 1, async function (job, done) {
    try {
      console.log('\nProcessing job with id %s at %s', job.id, new Date());

      const { data } = job;
      var res_json = {};
      const { jobs_id, job_post, preprompts, question_list, url_after_done } = data;
      const new_job_post_id = jobs_id;
      const gpt_payload = { jobs_id, preprompts, question_list };
      var chatgpt_output_filename = `/share/${new_job_post_id}/chatgpt_output.json`;

      // // http://openbox-firefox:3000/test1
      var random_openbox_host = getRandomOpenboxHost();
      const gpt_endpoint = `http://${random_openbox_host}:3000`;
      // console.log({ random_openbox_host, gpt_endpoint });

      // NOTE: ask poe start
      var chatgpt_summarize_result = await fetch(`${gpt_endpoint}/chatGPT/ask`, {
        method: 'post',
        body: JSON.stringify(gpt_payload),
        headers: { 'Content-Type': 'application/json' },
      });
      var chatgpt_summarize_result_json = await chatgpt_summarize_result.json();

      // NOTE: asking should be completed before this line
      console.log('calling done url', url_after_done);
      var done_result = await fetch(url_after_done, {
        method: 'post',
        body: JSON.stringify(chatgpt_summarize_result_json),
        headers: { 'Content-Type': 'application/json' },
      });
      var done_result_json = await done_result.json();
      console.log({ done_result_json });

      console.log(chatgpt_summarize_result_json);
      var update_job_state_payload = await writeOutputToDirectory(new_job_post_id, chatgpt_summarize_result_json);

      // NOTE: do long running task by this request ?
      console.log(update_job_state_payload);
      var res_json = await writeOutputToDB(new_job_post_id, update_job_state_payload);

      // NOTE: successful ask, cool down bot for slething
      await mySleep(1 * 60 * 1000);
      console.log('cooldown bot done');

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
};
