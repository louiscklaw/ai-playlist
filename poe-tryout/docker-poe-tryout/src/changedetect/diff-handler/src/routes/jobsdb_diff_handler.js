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

// var validUrl = require('valid-url');

function getPayloadToFlowHandlerJson(diff_link) {
  try {
    return {
      jobsdb_job_url: `https://hk.jobsdb.com/${diff_link}`,
      callback_url: `${FLOW_HANDLER_ENDPOINT}/jobsdb_link_extract_cb`,
    };
  } catch (error) {
    myLogger.error(JSON.stringify(error));
    myLogger.error('%o', { diff_link });
  }
}

router.post('/dump', (req, res) => {
  var output = { state: 'init', debug: {}, error: '' };

  try {
    var req_body = req.body;

    // TODO: use myLogger,
    myLogger.info('dump called');
    myLogger.info('%o', { req_body });

    output = { ...output, state: 'done', debug: req_body };
  } catch (error) {
    myLogger.error('error occur in diff-handler');
    myLogger.error('%o', error);
    output = { ...output, state: 'error', error: JSON.stringify(error) };
  }

  res.send(output);
});

router.post('/', (req, res) => {
  var output = { state: 'init', debug: {}, error: '' };

  try {
    var req_body = req.body;
    // console.log({ req_body });
    output = { ...output, state: 'start', debug: req_body };

    myLogger.info('call to jobsdb_diff_handler');
    myLogger.info('%o', { req_body });

    const json_message = req_body.message;
    const messages = json_message.split(/\n/);
    const sainted_links = getAddedLink(messages);

    // filter out done here ?
    const new_links = filterAlreadySeenLink(sainted_links);

    const flow_handler_payloads = new_links.map(link => {
      return getPayloadToFlowHandlerJson(link);
    });
    myLogger.info('%o', { flow_handler_payloads });

    flow_handler_payloads.forEach(async pl => {
      try {
        myLogger.info(`going to send postJobsdbLinkExtract -> `);
        myLogger.info('%o', pl);

        await postJobsdbLinkExtract(pl);
      } catch (error) {
        myLogger.error('%o', error);
        myLogger.error('%o', pl);
        throw new Error(`error during posting to flow-handler`);
      }
    });

    output = { ...output, state: 'done' };
  } catch (error) {
    myLogger.error('error occur in diff-handler');
    myLogger.error('%o', error);
    output = { ...output, state: 'error', error: JSON.stringify(error) };
  }

  res.send(output);
});

module.exports = router;
