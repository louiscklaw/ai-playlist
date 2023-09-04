const fs = require('fs');
const { postJobsdbLinkExtract } = require('../util/postJobsdbLinkExtract');

const express = require('express');
const router = express.Router();

const { getAddedLink } = require('../util/getAddedLink');
const { FLOW_HANDLER_ENDPOINT } = require('../config');

function getPayloadToFlowHandlerJson(diff_link) {
  
  try {
    return {
      jobsdb_job_url: `https://hk.jobsdb.com/${diff_link}`,
      callback_url: `${FLOW_HANDLER_ENDPOINT}/jobsdb_link_extract_cb`,
    };
  } catch (error) {
    console.log(error);
    console.log({ diff_link });
  }
}

router.post('/', (req, res) => {
  var output = { state: 'init', debug: {}, error: "" };

  try {
    var req_body = req.body;
    // console.log({ req_body });
    output = { ...output, state: 'start', debug: req_body };

    const json_message = req_body.message;
    const messages = json_message.split(/\n/);
    const sainted_messages = getAddedLink(messages);

    const flow_handler_payloads = sainted_messages.map(m => getPayloadToFlowHandlerJson(m.substring(1)));

    flow_handler_payloads.forEach(async j => {
      try {
        await postJobsdbLinkExtract(j);
      } catch (error) {
        console.log(error);
        throw new Error(`error during posting to flow-handler ${j}`);
      }
    });

    output = { ...output, state: 'done' };
  } catch (error) {
    console.log('error occur in diff-handler');
    console.log(error);
    output = { ...output, state: 'error', error: JSON.stringify(error) };
  }

  res.send(output);
});

module.exports = router;
