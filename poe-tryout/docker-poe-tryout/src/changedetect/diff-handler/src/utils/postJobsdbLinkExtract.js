const fetch = require('node-fetch');
const { FLOW_HANDLER_ENDPOINT } = require('../config');

function fetchPost(url, json_body) {
  console.log('fetchPost ' + json_body.jobsdb_job_url + ' ... ');

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(json_body),
    headers: { 'Content-Type': 'application/json' },
  });
}

function postJobsdbLinkExtract(json_body) {
  console.log('postJobsdbLinkExtract');
  console.log({ json_body });

  // return ;
  return fetchPost(`${FLOW_HANDLER_ENDPOINT}/jobsdb_link_extract`, json_body);
}

module.exports = { postJobsdbLinkExtract };
