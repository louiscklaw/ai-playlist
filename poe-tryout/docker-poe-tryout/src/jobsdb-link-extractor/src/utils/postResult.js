'use strict';

const fetch = require('node-fetch');

function fetchPost(url, json_body) {
  myLogger.info('fetchPost ' + url + ' ... ');
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(json_body),
    headers: { 'Content-Type': 'application/json' },
  });
}

async function postResult(url, json_body) {
  return fetchPost(url, json_body);
}

module.exports = { postResult };
