'use strict';

const { gpt_endpoint, JOBPOST_ENDPOINT } = require('../constants');

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

var kue = require('kue-scheduler');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');

var Queue = kue.createQueue({
  redis: { host: 'redis', port: 6379 },
});
Queue.clear();

// require('./now')(Queue);
// require('./poe')(Queue);
// require('./poe_dummy')(Queue);

const { initQueue, getInactiveCount } = require('./poe');
initQueue(Queue);

module.exports = { Queue, getInactiveCount };
