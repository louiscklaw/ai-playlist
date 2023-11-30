const fs = require('fs');
const { postJobsdbLinkExtract } = require('../utils/postJobsdbLinkExtract');

const express = require('express');
const router = express.Router();

const { getAddedLink } = require('../utils/getAddedLink');
const { myLogger } = require('../utils/myLogger');

// function getPayloadToFlowHandlerJson(diff_link) {
//   try {
//     return {
//       jobsdb_job_url: `https://hk.jobsdb.com/${diff_link}`,
//       callback_url: 'http://flow-handler:3000/jobsdb_link_extract_cb',
//     };
//   } catch (error) {
//     myLogger.error(JSON.stringify(error));
//     myLogger.error('%o', { diff_link });
//   }
// }

router.post('/', (req, res) => {
  var output = { state: 'init', debug: {}, error: {} };

  myLogger.error(`calling to an abonded function ${__dirname}/${__filename}`)
  res.send(output);


  // try {
  //   var req_body = req.body;
  //   // console.log({ req_body });
  //   output = { ...output, state: 'start', debug: req_body };

  //   const json_message = req_body.message;
  //   const messages = json_message.split(/\n/);
  //   const sainted_messages = getAddedLink(messages);

  //   const flow_handler_payloads = sainted_messages.map(m => getPayloadToFlowHandlerJson(m.substring(1)));

  //   flow_handler_payloads.forEach(async j => {
  //     try {
  //       await postJobsdbLinkExtract(j);
  //     } catch (error) {
  //       myLogger.error(JSON.stringify(error));
  //       throw new Error(`error during posting to flow-handler ${j}`);
  //     }
  //   });

  //   output = { ...output, state: 'done' };
  // } catch (error) {
  //   myLogger.error('error occur in diff-handler');
  //   myLogger.error(JSON.stringify(error));
  //   output = { ...output, state: 'error', error: error.message };
  // }

  
});

module.exports = router;
