const fs = require('fs'),
  path = require('path');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

const { postJobsdbLinkExtract } = require('../utils/postJobsdbLinkExtract');
const { createClient } = require('redis');
const express = require('express');
const router = express.Router();
const { myLogger } = require('../utils/myLogger');

const { getAddedLink } = require('../utils/getAddedLink');

const { FLOW_HANDLER_ENDPOINT } = require('../config');
const { isNewLink } = require('../utils/isNewLink');
const { createDirIfNotExists } = require('./createDirIfNotExists');
const { calculateMD5 } = require('./calculateMD5');
if (!FLOW_HANDLER_ENDPOINT) throw new Error('FLOW_HANDLER_ENDPOINT is not configured');

const client = createClient({
  url: 'redis://:123456@diff-handler-redis:6379',
});

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

async function filterAlreadySeenLink(links, client) {
  var new_links = [];
  var output = { state: 'init', debug: links, error: '' };

  try {
    output = {...output, state:'start'}
    for (var i = 0; i < links.length; i++) {
      var x = links[i].toString();
      if (await isNewLink(x, client)) {
        new_links.push(x);
      } else {
        myLogger.info(`already seen, skipping ${x}`);
      }
    }
  } catch (error) {
    output = { ...output, state: 'error', new_links, error: JSON.stringify(error) };

    await createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
    fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

    myLogger.error(JSON.stringify(error));
  }

  return new_links;
}

module.exports = { filterAlreadySeenLink };
