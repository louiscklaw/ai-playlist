const fetch = require('node-fetch');

const { myLogger } = require('./myLogger');

function fetchPost(url, json_body) {
  myLogger.info('fetchPost ' + json_body.jobsdb_job_url + ' ... ');

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(json_body),
    headers: { 'Content-Type': 'application/json' },
  });
}

module.exports = { fetchPost };
