const { myLogger } = require("./myLogger");

function fetchPost(url, json_body) {
  myLogger.info('fetchPost ' + url + ' ... ');
  
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(json_body),
    headers: { 'Content-Type': 'application/json' },
  });
}

function poeProcessNewJobPost(json_body) {
  return fetchPost(`http://poe-scheduler-api:3002/process_new_job_post`, json_body);
}

async function poeSchedulerHellworld() {
  const result = await fetch('http://poe-scheduler-api:3002/helloworld');
  const res_text = await result.text();
  return res_text;
}

module.exports = { fetchPost, poeProcessNewJobPost, poeSchedulerHellworld };
