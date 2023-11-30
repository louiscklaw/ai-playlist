'use strict';
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');

const { gpt_endpoint, getRandomOpenboxHost, JOBPOST_ENDPOINT } = require('../constants');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const { writeOutputToDB } = require('../utils/writeOutputToDB');
const { writeOutputToDirectory } = require('../utils/writeOutputToDirectory');
const { mySleep } = require('../utils/mySleep');
const { mySleepM } = require('../utils/mySleepM');
const { myLogger } = require('../utils/myLogger');

myLogger.info('poe Queue init');

function getRandomPoeEndpoint() {
  try {
    // http://openbox-poe-seat1:3000
    var random_openbox_host = getRandomOpenboxHost();
    const gpt_endpoint = `http://${random_openbox_host}:3000`;

    return { random_openbox_host, gpt_endpoint };
  } catch (error) {
    myLogger.info('error geting random poe endpoint, return default poe-seat');
    console.log(error);
    return 'http://openbox-poe-seat1:3000';
  }
}

var queue_inactive_count = 0;
function getInactiveCount() {
  return queue_inactive_count;
}

function initQueue(Queue) {
  Queue.process('poe', 1, async function (job, done) {
    try {
      myLogger.info('\nProcessing job with id %s at %s', job.id, new Date());

      // const new_job_post_id = jobs_id;
      // var chatgpt_output_filename = `/share/${new_job_post_id}/chatgpt_output.json`;

      // NOTE: collect input
      const { data } = job;
      const { working_dir, preprompts, question_list, callback_url } = data;

      const gpt_payload = { preprompts, question_list };
      const { random_openbox_host, gpt_endpoint } = getRandomPoeEndpoint();

      // NOTE: log input
      myLogger.info('%o', { random_openbox_host, gpt_endpoint, data, gpt_payload });

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
        await fs.writeFileSync('/share/hello_poe.json', JSON.stringify(result_cb_json),{encoding:'utf8'})
      } else {
        myLogger.info('%o', { chatgpt_summarize_result_json });
        const { chat_history } = chatgpt_summarize_result_json;
        console.log(chat_history.q_and_a.history);
        myLogger.info('no callback url provided, showing here');
      }

      // // NOTE: asking should be completed before this line
      
      // // NOTE: successful ask, cool down bot for slething
      // TODO: environment variable
      await mySleepM(1);
      myLogger.info('cooldown bot done');

      done(null, { deliveredAt: new Date(), data });
    } catch (error) {
      if (error.code == 'ECONNREFUSED' && error.message.indexOf('openbox-firefox') > -1) {
        done(new Error('the openbox-firefox server is not already, schedule retry'));
      } else {
        myLogger.info('%o', { error });
        done(new Error(error.message));
      }
    }
  });

  //listen on scheduler errors
  Queue.on('schedule error', function (error) {
    try {
      //handle all scheduling errors here
      myLogger.info('schedule error');
      console.log(error);
    } catch (err) {}
  });

  //listen on success scheduling
  Queue.on('schedule success', function (job) {
    // NOTE: a highly recommended place to attach job instance level events listeners

    // myLogger.info("%o", { QueueInactiveCount: Queue.inactiveCount() });
    Queue.inactiveCount((err, count) => {
      myLogger.info('%o', { state: 'Queue schedule success', QueueInactiveCount: count });
      queue_inactive_count = count;
      console.log(err);
    });

    job
      .on('complete', function (result) {
        // myLogger.info('Job completed with data ', result)
        myLogger.info('Dequeue job', job.id);
        Queue.removeJob(job);
      })
      .on('failed attempt', function (errorMessage, doneAttempts) {
        console.log(errorMessage);
        myLogger.info('Job failed');
      })
      .on('failed', function (errorMessage) {
        console.log(errorMessage);
        myLogger.info('Job failed');
      })
      .on('progress', function (progress, data) {
        myLogger.info('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
      });
  });
}

module.exports = { initQueue, getInactiveCount };
