'use strict';

const { getRandomInt } = require('./utils/getRandomInt');

// const gpt_endpoint = 'http://openbox-seat1:3000';

const openbox_hosts = ['openbox-seat1', 'openbox-seat2'];

const DBAPI_HOST = 'http://dbapi:3001/api/v1';
const JOBPOST_ENDPOINT = `${DBAPI_HOST}/JobPost`;
const SHARE_DIR = '/share';

function getRandomOpenboxHost() {
  var randomIdx = getRandomInt(openbox_hosts.length, 1) - 1;
  console.log({ randomIdx });
  // return 'openbox-seat1';
  return openbox_hosts[randomIdx];
}

module.exports = { JOBPOST_ENDPOINT, getRandomOpenboxHost, SHARE_DIR };
