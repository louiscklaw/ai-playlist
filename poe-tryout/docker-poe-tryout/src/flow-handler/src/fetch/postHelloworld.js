const fetch = require('node-fetch');

function postHelloworld() {
  return fetch('http://poe-scheduler-api:3002/postHelloworld', {
    method: 'post',
    body: JSON.stringify({ hello: 'post helloworld' }),
    headers: { 'Content-Type': 'application/json' },
  });
}

module.exports = { postHelloworld };
