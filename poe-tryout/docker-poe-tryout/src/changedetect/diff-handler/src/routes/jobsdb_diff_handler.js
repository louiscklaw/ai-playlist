const fs = require('fs')
const {postJobsdbLinkExtract} = require('../util/postJobsdbLinkExtract')

const express = require('express');
const router = express.Router();

function getPayloadToFlowHanderJson(diff_link) {
  try {
    return {
      jobsdb_job_url: `https://hk.jobsdb.com/${diff_link}`,
      callback_url: 'http://flow-handler:3000/jobsdb_link_extract_cb',
    } 
  } catch (error) {
    console.log(error)
    console.log({diff_link})
  }
}

router.post('/', (req, res) => {
  var req_body = req.body;
  console.log({req_body});
  
  const json_message = req_body.message;
  const messages = json_message.split(/\n/)
  const sainted_messages = messages
    .map(m => m.replace(/\(added\) /g,'').trim())
    .filter(m => m != '')

  const flow_handler_payloads = sainted_messages.map(m => getPayloadToFlowHanderJson(m.substring(1)))

  flow_handler_payloads.forEach( async(j) =>{
    try {
      await postJobsdbLinkExtract(j);
    } catch (error) {
      console.log(error)
      console.log(`error during posting to flow-handler ${j}`)
    }
  })


  fs.writeFileSync(
    '/share/jobsdb_diff_handler_diff.json', 
    JSON.stringify(flow_handler_payloads),
    {encoding: 'utf8'}
    );

  res.send('jobsdb_diff_handler Hello, World!');
});

module.exports = router;
