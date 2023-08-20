const fs = require('fs');
const { postJobsdbLinkExtract } = require('../util/postJobsdbLinkExtract');

const express = require('express');
const router = express.Router();

const { getAddedLink } = require('../util/getAddedLink');

// var validUrl = require('valid-url');

function getPayloadToFlowHandlerJson(diff_link) {
  try {
    return {
      jobsdb_job_url: `https://hk.jobsdb.com/${diff_link}`,
      callback_url: 'http://flow-handler:3000/jobsdb_link_extract_cb',
    };
  } catch (error) {
    console.log(error);
    console.log({ diff_link });
  }
}

router.post('/dump', (req, res) => {
  var output = { state: 'init', debug: {}, error: {} };

  try {
    var req_body = req.body;

    console.log('dump called');
    console.log({req_body});

    output = { ...output, state: 'done', debug: req_body };
  } catch (error) {
    console.log('error occur in diff-handler');
    console.log(error);
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

    console.log('call to jobsdb_diff_handler')
    console.log({req_body})

    const json_message = req_body.message;
    const messages = json_message.split(/\n/);
    const sainted_messages = getAddedLink(messages);

    const flow_handler_payloads = sainted_messages.map(m => {
      console.log('blablabla');
      return getPayloadToFlowHandlerJson(m)}
      );

    flow_handler_payloads.forEach(async pl => {
      try {
        console.log(`going to send postJobsdbLinkExtract -> `)
        console.log(pl);

        // TODO: resume me
        // await postJobsdbLinkExtract(pl);

      } catch (error) {
        console.log(error);
        console.log(pl)
        throw new Error(`error during posting to flow-handler`);
      }
    });

    output = { ...output, state: 'done' };
  } catch (error) {
    console.log('error occur in diff-handler');
    console.log(error);
    output = { ...output, state: 'error', error: error.message };
  }

  res.send(output);
});

module.exports = router;
