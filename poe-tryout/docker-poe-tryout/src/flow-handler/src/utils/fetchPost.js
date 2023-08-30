const fetch = require('node-fetch');
const { myLogger } = require('./myLogger');

function fetchPost(url, json_body) {
  myLogger.info('fetchPost ' + url + ' ... ');

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(json_body),
    headers: { 'Content-Type': 'application/json' },
  });
}

function postJobsdbPostExtract(json_body) {
  return fetchPost(`http://jobsdb-link-extractor:3000/jobsdbPostExtract`, json_body);
}

module.exports = { fetchPost, postJobsdbPostExtract };
