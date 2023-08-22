const fetch = require('node-fetch');

async function listJobsdbDoneList() {
  const response = await fetch('http://dbapi:3001/api/v1/JobsdbDoneList');

  const body = await response.json();

  return body;
}

module.exports = { listJobsdbDoneList };
