const fetch = require('node-fetch');

async function getJobsdbDoneListCount() {
  const response = await fetch('http://dbapi:3001/api/v1/JobsdbDoneList/count');

  const body = await response.json();

  return body;
}

module.exports = { getJobsdbDoneListCount };
