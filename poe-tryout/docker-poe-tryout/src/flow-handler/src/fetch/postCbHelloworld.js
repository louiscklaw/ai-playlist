const fetch = require('node-fetch');

function postCbHelloworld() {
  return fetch('http://poe-scheduler-api:3002/postCbHelloworld', {
    method: 'post',
    body: JSON.stringify({ hello: 'post helloworld' }),
    headers: { 'Content-Type': 'application/json' },
  });
}

module.exports = { postCbHelloworld };
