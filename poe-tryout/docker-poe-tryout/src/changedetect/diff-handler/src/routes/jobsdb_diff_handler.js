const fs = require('fs');
const { postJobsdbLinkExtract } = require('../utils/postJobsdbLinkExtract');

const express = require('express');
const router = express.Router();
const { myLogger } = require('../utils/myLogger');

const { getAddedLink } = require('../utils/getAddedLink');

// var validUrl = require('valid-url');

function getPayloadToFlowHandlerJson(diff_link) {
  try {
    return {
      jobsdb_job_url: `https://hk.jobsdb.com/${diff_link}`,
      callback_url: 'http://flow-handler:3000/jobsdb_link_extract_cb',
    };
  } catch (error) {
    myLogger.error(error.message);
    myLogger.error('%o', { diff_link });
  }
}

router.post('/dump', (req, res) => {
  var output = { state: 'init', debug: {}, error: {} };

  try {
    var req_body = req.body;

    // TODO: use myLogger,
    myLogger.info('dump called');
    myLogger.info('%o', { req_body });

    output = { ...output, state: 'done', debug: req_body };
  } catch (error) {
    myLogger.error('error occur in diff-handler');
    myLogger.error('%o', error);
    output = { ...output, state: 'error', error: error.message };
  }

  res.send(output);
});

router.post('/', (req, res) => {
  var output = { state: 'init', debug: {}, error: {} };

  try {
    var req_body = req.body;
    // console.log({ req_body });
    output = { ...output, state: 'start', debug: req_body };

    myLogger.info('call to jobsdb_diff_handler');
    myLogger.info('%o', { req_body });

    const json_message = req_body.message;
    const messages = json_message.split(/\n/);
    const sainted_messages = getAddedLink(messages);

    const flow_handler_payloads = sainted_messages.map(m => {
      return getPayloadToFlowHandlerJson(m);
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
    output = { ...output, state: 'error', error: error.message };
  }

  res.send(output);
});

module.exports = router;
