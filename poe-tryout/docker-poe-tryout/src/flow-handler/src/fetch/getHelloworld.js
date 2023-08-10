const fetch = require('node-fetch');

function getHelloworld() {
  return fetch('http://example.com');
}

module.exports = { getHelloworld };
