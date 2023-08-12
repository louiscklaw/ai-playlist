'use strict';
const path = require('path');

const { gpt_endpoint, getRandomOpenboxHost, JOBPOST_ENDPOINT } = require('../constants');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
const { writeOutputToDB } = require('../utils/writeOutputToDB');
const { writeOutputToDirectory } = require('../utils/writeOutputToDirectory');
const { mySleep } = require('../utils/mySleep');

module.exports = Queue => {
  console.log('poe_dummy Queue init');

  Queue.process('poe_dummy', 1, async function (job, done) {
    try {
      console.log('\nProcessing job with id %s at %s', job.id, new Date());

      var output = {};
      const { data } = job;
      const { preprompts, question_list, callback_url, context } = data;

      console.log('using poe_dummy');
      console.log(data);

      // // const new_job_post_id = jobs_id;
      // // var chatgpt_output_filename = `/share/${new_job_post_id}/chatgpt_output.json`;

      // var res_json = {};
      // const gpt_payload = { preprompts, question_list };

      // // // // http://openbox-firefox:3000/test1
      // var random_openbox_host = getRandomOpenboxHost();
      // const gpt_endpoint = `http://${random_openbox_host}:3000`;
      // console.log({ random_openbox_host, gpt_endpoint, callback_url });

      // // NOTE: ask poe start
      // var chatgpt_summarize_result = await fetch(`${gpt_endpoint}/chatGPT/ask`, {
      //   method: 'post',
      //   body: JSON.stringify(gpt_payload),
      //   headers: { 'Content-Type': 'application/json' },
      // });
      var chatgpt_summarize_result_json = {
        state: 'ask_done',
        json_input: { question_list: ["say 'hello 1' to me", "say 'hello 2' to me"] },
        chat_history: {
          q_and_a: {
            preprompts: [],
            history: [
              { question: "say 'hello 1' to me", answer: 'Hello 1! How can I assist you today?' },
              { question: "say 'hello 2' to me", answer: 'Hello 2! How can I assist you today?' },
            ],
          },
        },
      };

      if (callback_url) {
        var callback_payload = {
          input: data,
          output: chatgpt_summarize_result_json,
          context,
        };

        console.log('calling callback_url');
        var result = await fetch(callback_url, {
          method: 'post',
          body: JSON.stringify(callback_payload),
          headers: { 'Content-Type': 'application/json' },
        });
        if (result.status != 200) throw new Error(result);
        // var res_json = await result.json();
        console.log('callback done');
      } else {
        console.log({ chatgpt_summarize_result_json });
        console.log('no callback url provided, skipping... ');
      }

      done(null, { deliveredAt: new Date(), output, data });
    } catch (error) {
      console.log('error inside poe_dummy');
      console.log(error);
      done(new Error(error.message));
    }
  });

  //listen on scheduler errors
  Queue.on('schedule error', function (error) {
    //handle all scheduling errors here
    console.log('using dummy_poe, schedule error');
    console.log(error);
  });

  //listen on success scheduling
  Queue.on('schedule success', function (job) {
    //a highly recommended place to attach
    //job instance level events listeners

    // console.log({ QueueInactiveCount: Queue.inactiveCount() });
    Queue.inactiveCount((err, count) => {
      console.log('using dummy_poe, inactiveCount:' + count);
      console.log({
        state: 'Queue schedule success',
        QueueInactiveCount: count,
      });
    });

    job
      .on('complete', function (result) {
        // console.log('Job completed with data ', result)
        console.log('using dummy_poe, Dequeue job', job.id);
        Queue.removeJob(job);
      })
      .on('failed attempt', function (errorMessage, doneAttempts) {
        console.log(errorMessage);
        console.log('using dummy_poe, Job failed');
      })
      .on('failed', function (errorMessage) {
        console.log(errorMessage);
        console.log('using dummy_poe, Job failed');
      })
      .on('progress', function (progress, data) {
        console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data);
      });
  });
};
