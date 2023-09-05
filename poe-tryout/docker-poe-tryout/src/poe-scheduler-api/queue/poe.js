const fs = require('fs');
const fetch = require('node-fetch');

// TODO: remove me
// 'use strict';
// const path = require('path');
// const { gpt_endpoint, getRandomOpenboxHost, JOBPOST_ENDPOINT } = require('../constants');
// const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
// const { writeOutputToDB } = require('../utils/writeOutputToDB');
// const { writeOutputToDirectory } = require('../utils/writeOutputToDirectory');
// const { mySleep } = require('../utils/mySleep');

// NOTE: test -> queoe how to test ?

const { mySleepM } = require('../utils/mySleepM');
const { myLogger } = require('../utils/myLogger');
const { getRandomPoeEndpoint } = require('./getRandomPoeEndpoint');

myLogger.info('poe Queue init');

const SESSION_COOLDOWN_MINUTE = 1;

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
      const { working_dir, preprompts, question_list, callback_url, parse_md } = data;
      console.log({parse_md})

      const gpt_payload = { preprompts, question_list };
      const { random_openbox_host, gpt_endpoint } = getRandomPoeEndpoint();

      // NOTE: log input
      myLogger.info(JSON.stringify({ random_openbox_host, gpt_endpoint, data, gpt_payload }));

      // NOTE: ask poe start
      if (parse_md == true) {
        myLogger.info('parse_md true, use /ask_with_md')
        var poe_result = await fetch(`${gpt_endpoint}/chatGPT/ask_with_md`, {
          method: 'post',
          body: JSON.stringify(gpt_payload),
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        myLogger.info('parse_md false, use /ask')
        var poe_result = await fetch(`${gpt_endpoint}/chatGPT/ask`, {
          method: 'post',
          body: JSON.stringify(gpt_payload),
          headers: { 'Content-Type': 'application/json' },
        });
      }

      var chatgpt_summarize_result_json = await poe_result.json();
      var {answer} = chatgpt_summarize_result_json
      if (answer == 'error_found') throw new Error('error_foudn in answer')

      chatgpt_summarize_result_json = { ...chatgpt_summarize_result_json, working_dir };

      if (callback_url && callback_url !='') {
        var result_cb_url = await fetch(callback_url, {
          method: 'post',
          body: JSON.stringify(chatgpt_summarize_result_json),
          headers: { 'Content-Type': 'application/json' },
        });
        var result_cb_json = await result_cb_url.json();
        await fs.writeFileSync('/share/hello_poe.json', JSON.stringify(result_cb_json), { encoding: 'utf8' });
      } else {
        myLogger.info(JSON.stringify(chatgpt_summarize_result_json));
        const { chat_history } = chatgpt_summarize_result_json;
        console.log(chat_history.q_and_a.history);
        myLogger.info('no callback url provided, showing here');
      }

      // // NOTE: asking should be completed before this line

      // // NOTE: successful ask, cool down bot for slething

      myLogger.info('starting cooldown');
      await mySleepM(SESSION_COOLDOWN_MINUTE);
      myLogger.info('cooldown bot done');

      done(null, { deliveredAt: new Date(), data });
    } catch (error) {
      if (error.code == 'ECONNREFUSED' && error.message.indexOf('openbox-firefox') > -1) {
        done(new Error('the openbox-firefox server is not already, schedule retry'));
      } else {
        myLogger.info(JSON.stringify(error));
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
      myLogger.info(JSON.stringify({ state: 'Queue schedule success', QueueInactiveCount: count }));
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
