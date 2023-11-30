const fetch = require('node-fetch');

const { myLogger } = require('./myLogger');

function fetchGlassdoorPost(url, json_body) {
  try {
    myLogger.info('fetchGlassdoorPost ' + json_body.glassdoor_job_url + ' ... ');

    var result;
    result = fetch(url, {
      method: 'POST',
      body: JSON.stringify(json_body),
      headers: { 'Content-Type': 'application/json' },
    });

    return result;
  } catch (error) {
    myLogger.error(error.message);
  }
}

module.exports = { fetchGlassdoorPost };
