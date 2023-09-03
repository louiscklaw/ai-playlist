const fs = require('fs');
const { postJobsdbLinkExtract } = require('../utils/postJobsdbLinkExtract');
const { createClient } = require('redis');
const express = require('express');
const router = express.Router();
const { myLogger } = require('../utils/myLogger');

const { getAddedLink } = require('../utils/getAddedLink');

const { FLOW_HANDLER_ENDPOINT } = require('../config');
const { isNewLink } = require('../utils/isNewLink');
const { filterAlreadySeenLink } = require('../utils/filterAlreadySeenLink');
const { calculateMD5 } = require('../utils/calculateMD5');
const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
if (!FLOW_HANDLER_ENDPOINT) throw new Error('FLOW_HANDLER_ENDPOINT is not configured');

const {REDIS_PASSWORD} = process.env
if (!REDIS_PASSWORD) throw new Error('REDIS_PASSWORD is not defined')
const client = createClient({
  url: `redis://:${REDIS_PASSWORD}@diff-handler-redis:6379`,
});

client.on('error', err => console.log('Redis Client Error', err));
// used to initialize connection
client.connect();

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

    myLogger.info('dump called');
    myLogger.info('%o', { req_body });

    output = { ...output, state: 'done', debug: req_body };
  } catch (error) {
    myLogger.error('error occur in diff-handler');
    myLogger.error(JSON.stringify(error));
    output = { ...output, state: 'error', error: JSON.stringify(error) };
  }

  res.send(output);
});

router.post('/',async (req, res) => {
  var output = { state: 'init', debug: {}, error: '' };

  try {
    var req_body = req.body;
    // console.log({ req_body });
    output = { ...output, state: 'start', debug: req_body };

    await createDirIfNotExists(`/logs/error/jobsdb_diff_handler`);
    var filename = `/logs/error/jobsdb_diff_handler/${calculateMD5(req_body)}.json`;
    var payload = {req_body}
    await fs.writeFileSync(
      filename,
      JSON.stringify(payload),
      {encoding:'utf8'});

    myLogger.info('call to jobsdb_diff_handler');
    myLogger.info(JSON.stringify(req_body));

    const json_message = req_body.message;
    const messages = json_message.split(/\n/);
    const sainted_links = getAddedLink(messages);

    // filter out done here ?
    const new_links = await filterAlreadySeenLink(sainted_links, client);

    const flow_handler_payloads = new_links.map(link => {
      return getPayloadToFlowHandlerJson(link);
    });
    myLogger.info(JSON.stringify(flow_handler_payloads));

    flow_handler_payloads.forEach(async (pl) => {
      try {
        myLogger.info(`going to send postJobsdbLinkExtract -> `);
        myLogger.info(JSON.stringify(pl));

        await postJobsdbLinkExtract(pl);
      } catch (error) {
        myLogger.error(JSON.stringify(error));
        myLogger.error(JSON.stringify(pl));

        console.log(error)

        throw new Error(`error during posting to flow-handler`);
      }
    });

    output = { ...output, state: 'done' };
  } catch (error) {
    myLogger.error('error occur in diff-handler');
    myLogger.error(JSON.stringify(error));
    output = { ...output, state: 'error', error: JSON.stringify(error) };
  }

  res.send(output);
});

module.exports = router;
