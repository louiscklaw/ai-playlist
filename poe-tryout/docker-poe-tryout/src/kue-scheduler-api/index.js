'use strict'
const fs = require('fs')
var path = require('path')

const fetch = require('node-fetch')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())

var kue = require('kue-scheduler')

const PORT = 3002
const DBAPI_HOST = 'http://dbapi:3001/api/v1'
const JOBPOST_ENDPOINT = `${DBAPI_HOST}/JobPost`
var gpt_endpoint = 'http://openbox-firefox:3000'

var Queue = kue.createQueue({
  redis: { host: 'redis', port: 6379 },
})

//processing jobs
Queue.process('now', 1, async function (job, done) {
  console.log('\nProcessing job with id %s at %s', job.id, new Date())
  const { data } = job
  const { new_job_post_id, gpt_payload } = data

  // http://openbox-firefox:3000/test1

  var chatgpt_output_filename = `/share/${new_job_post_id}/chatgpt_output.json`;
  var chatgpt_summarize_res = await fetch(`${gpt_endpoint}/chatgpt_summarize_helloworld`, {
    method: 'post',
    body: JSON.stringify(gpt_payload),
    headers: { 'Content-Type': 'application/json' },
  })
  var chatgpt_summarize_res_json = await chatgpt_summarize_res.json();
  try {
    await fs.mkdirSync(path.dirname(chatgpt_output_filename));
  } catch (error) {
    console.log(`${path.dirname(chatgpt_output_filename)} already exists`);
  }

  await fs.writeFileSync(
    chatgpt_output_filename,
    JSON.stringify(chatgpt_summarize_res_json, null, 2),
    { encoding: 'utf8' });

  var update_job_state_payload = {
    state: 'job_process_done',
    chatgpt_summarize_res_json
  }

  // NOTE: do long running task by this request ?
  // http://dbapi:3001/api/v1/JobPost/${new_job_id}
  var res = await fetch(`${JOBPOST_ENDPOINT}/${new_job_post_id}`, {
    method: 'patch',
    body: JSON.stringify(update_job_state_payload),
    headers: { 'Content-Type': 'application/json' },
  })
  var res_json = await res.json();
  var json_input_filename = `/share/${new_job_post_id}/input.json`;
  try {
    await fs.mkdirSync(path.dirname(json_input_filename));
  } catch (error) {
    console.log(`${path.dirname(json_input_filename)} already exists`);
  }

  await fs.writeFileSync(
    json_input_filename,
    JSON.stringify(res_json, null, 2),
    { encoding: 'utf8' });


  done(null, { deliveredAt: new Date(), res_json, data })

})

//listen on scheduler errors
Queue.on('schedule error', function (error) {
  //handle all scheduling errors here
  console.log(error)
})

//listen on success scheduling
Queue.on('schedule success', function (job) {
  //a highly recommended place to attach
  //job instance level events listeners

  // console.log({ QueueInactiveCount: Queue.inactiveCount() });
  Queue.inactiveCount((err, count) => {
    console.log({
      'state': "Queue schedule success",
      QueueInactiveCount: count
    })
  })

  job
    .on('complete', function (result) {
      // console.log('Job completed with data ', result)
      console.log('Dequeue job', job.id)
      Queue.removeJob(job);

    })
    .on('failed attempt', function (errorMessage, doneAttempts) {
      console.log('Job failed')
    })
    .on('failed', function (errorMessage) {
      console.log('Job failed')
    })
    .on('progress', function (progress, data) {
      console.log('\r  job #' + job.id + ' ' + progress + '% complete with data ', data)
    })
})

app.post('/process_new_job_post', async (req, res) => {
  console.log('/process_new_job_post');

  const req_body = req.body
  const { new_job_post_id, job_post, gpt_payload } = req_body

  //prepare a job to perform
  //dont save it
  var job = Queue.createJob('now', { new_job_post_id, job_post, gpt_payload })
    .attempts(5)
    .backoff({ delay: 60000, type: 'fixed' })
    .priority('normal')

  Queue.now(job)

  res.send({ state: 'schedued' })
})

try {
  app.listen(PORT)
  console.log(`express init done on oprt ${PORT}.`)
} catch (error) {
  console.log(error)
} finally {
  // browser.close();
}
