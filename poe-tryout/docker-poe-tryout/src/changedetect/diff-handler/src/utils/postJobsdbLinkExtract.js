const fetch = require('node-fetch');
const { FLOW_HANDLER_ENDPOINT } = require('../config');
const { myLogger } = require('./myLogger');

function fetchPost(url, json_body) {
  myLogger.info('fetchPost ' + json_body.jobsdb_job_url + ' ... ');

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(json_body),
    headers: { 'Content-Type': 'application/json' },
  });
}

function postJobsdbLinkExtract(json_body) {
  try {
    myLogger.info('postJobsdbLinkExtract');
    myLogger.info({ json_body });

    // return ;
    return fetchPost(`${FLOW_HANDLER_ENDPOINT}/jobsdb_link_extract`, json_body);
  } catch (error) {
    console.log({json_body, error});
    throw new Error(JSON.stringify(error))
  }
}

module.exports = { postJobsdbLinkExtract };
