const fs = require('fs');
const { postJobsdbLinkExtract } = require('../utils/postJobsdbLinkExtract');
const { createClient } = require('redis');
const express = require('express');
const router = express.Router();
const { myLogger } = require('../utils/myLogger');

const { getAddedLink } = require('../utils/getAddedLink');

const { FLOW_HANDLER_ENDPOINT } = require('../config');
const { isNewLink } = require('../utils/isNewLink');
if (!FLOW_HANDLER_ENDPOINT) throw new Error('FLOW_HANDLER_ENDPOINT is not configured');

const client = createClient({
  url: 'redis://:123456@diff-handler-redis:6379',
});

client.on('error', err => console.log('Redis Client Error', err));
client.connect();

async function filterAlreadySeenLink(links, client) {
  var output = [];

  for (var i = 0; i < links.length; i++) {
    var x = links[i].toString();
    if (await isNewLink(x, client)) {
      output.push(x);
    } else {
      console.log(`already seen, skipping ${x}`);
    }
  }

  return output;
}

module.exports ={filterAlreadySeenLink}