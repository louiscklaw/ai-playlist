const fetch = require('node-fetch');

async function newJobsdbDoneList({ link }) {
  const body = { link };

  const response = await fetch('http://dbapi:3001/api/v1/JobsdbDoneList', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await response.json();
  return data;
}

module.exports = { newJobsdbDoneList };
