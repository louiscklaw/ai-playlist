'use strict';

const { getRandomInt } = require('./utils/getRandomInt');
const { myLogger } = require('./utils/myLogger');

// const gpt_endpoint = 'http://openbox-poe-seat1:3000';

const openbox_hosts = [
  'openbox-poe-seat1',
  // 'openbox-poe-seat2'
];

// TODO: use environment variables
const DBAPI_HOST = 'http://dbapi:3001/api/v1';
const JOBPOST_ENDPOINT = `${DBAPI_HOST}/JobPost`;
const SHARE_DIR = '/share';

function getRandomOpenboxHost() {
  var randomIdx = getRandomInt(openbox_hosts.length, 1) - 1;
  myLogger.info('%o', { randomIdx });
  // return 'openbox-poe-seat1';
  return openbox_hosts[randomIdx];
}

module.exports = { JOBPOST_ENDPOINT, getRandomOpenboxHost, SHARE_DIR };
