'use strict';
const path = require('path');
const fetch = require('node-fetch');

const { gpt_endpoint, getRandomOpenboxHost, JOBPOST_ENDPOINT } = require('../constants');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const { writeOutputToDB } = require('../utils/writeOutputToDB');
const { writeOutputToDirectory } = require('../utils/writeOutputToDirectory');
const { mySleep } = require('../utils/mySleep');
const { mySleepM } = require('../utils/mySleepM');

console.log('poe Queue init');

function getRandomPoeEndpoint() {
  try {
    // http://openbox-poe-seat1:3000
    var random_openbox_host = getRandomOpenboxHost();
    const gpt_endpoint = `http://${random_openbox_host}:3000`;

    return { random_openbox_host, gpt_endpoint };
  } catch (error) {
    console.log('error geting random poe endpoint, return default poe-seat');
    console.log(error);
    return 'http://openbox-poe-seat1:3000';
  }
}

module.exports = Queue => {
  Queue.process('poe', 1, async function (job, done) {
    try {
      console.log('\nProcessing job with id %s at %s', job.id, new Date());

      // const new_job_post_id = jobs_id;
      // var chatgpt_output_filename = `/share/${new_job_post_id}/chatgpt_output.json`;

      // NOTE: collect input
      const { data } = job;
      const { working_dir, preprompts, question_list, callback_url } = data;

      const gpt_payload = { preprompts, question_list };
      const { random_openbox_host, gpt_endpoint } = getRandomPoeEndpoint();

      // NOTE: log input
      console.log({ random_openbox_host, gpt_endpoint, data, gpt_payload });

      // NOTE: ask poe start
      var poe_result = await fetch(`${gpt_endpoint}/chatGPT/ask`, {
        method: 'post',
        body: JSON.stringify(gpt_payload),
        headers: { 'Content-Type': 'application/json' },
      });
      var chatgpt_summarize_result_json = await poe_result.json();
      chatgpt_summarize_result_json = { ...chatgpt_summarize_result_json, working_dir };

      if (callback_url) {
        var result_cb_url = await fetch(callback_url, {
          method: 'post',
          body: JSON.stringify(chatgpt_summarize_result_json),
          headers: { 'Content-Type': 'application/json' },
        });
        var result_cb_json = await result_cb_url.json();
      } else {
        console.log({ chatgpt_summarize_result_json });
        const { chat_history } = chatgpt_summarize_result_json;
        console.log(chat_history.q_and_a.history);
        console.log('no callback url provided, showing here');
      }

      // TODO: remove me ??
      // // NOTE: asking should be completed before this line
      // console.log('calling done url', url_after_done);
      // var done_result = await fetch(url_after_done, {
      //   method: 'post',
      //   body: JSON.stringify(chatgpt_summarize_result_json),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      // var done_result_json = await done_result.json();
      // console.log({ done_result_json });

      // console.log(chatgpt_summarize_result_json);
      // var update_job_state_payload = await writeOutputToDirectory(new_job_post_id, chatgpt_summarize_result_json);

      // // NOTE: do long running task by this request ?
      // console.log(update_job_state_payload);
      // var res_json = await writeOutputToDB(new_job_post_id, update_job_state_payload);

      // // NOTE: successful ask, cool down bot for slething

      await mySleepM(1);
      console.log('cooldown bot done');

      done(null, { deliveredAt: new Date(), data });
    } catch (error) {
      if (error.code == 'ECONNREFUSED' && error.message.indexOf('openbox-firefox') > -1) {
        done(new Error('the openbox-firefox server is not already, schedule retry'));
      } else {
        console.log({ error });
        done(new Error(error.message));
      }
    }
  });

  //listen on scheduler errors
  Queue.on('schedule error', function (error) {
    try {
      //handle all scheduling errors here
      console.log('schedule error');
      console.log(error);
    } catch (err) {}
  });

  //listen on success scheduling
  Queue.on('schedule success', function (job) {
    // NOTE: a highly recommended place to attach job instance level events listeners

    // console.log({ QueueInactiveCount: Queue.inactiveCount() });
    Queue.inactiveCount((err, count) => {
      console.log({ state: 'Queue schedule success', QueueInactiveCount: count });
    });

    job
      .on('complete', function (result) {
        // console.log('Job completed with data ', result)
        console.log('Dequeue job', job.id);
        Queue.removeJob(job);
      })
      .on('failed attempt', function (errorMessage, doneAttempts) {
        console.log(errorMessage);
        console.log('Job failed');
      })
      .on('failed', function (errorMessage) {
        console.log(errorMessage);
        console.log('Job failed');
      })
      .on('progress', function (progress, data) {
        console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
      });
  });
};