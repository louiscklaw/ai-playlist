const fetch = require('node-fetch');

function newLog(comment, level = 'info') {
  const body = { level, comment };

  return fetch('http://dbapi:3001/api/v1/Log', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

function helloworld() {
  console.log('helloworld');
  return 'helloworld';
}

module.exports = { helloworld, newLog };
