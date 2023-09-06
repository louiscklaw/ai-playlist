const fs = require('fs');
const { postJobsdbLinkExtract } = require('../../utils/postJobsdbLinkExtract');
const { createClient } = require('redis');
const express = require('express');
const router = express.Router();
const { myLogger } = require('../../utils/myLogger');

const { getAddedLink } = require('../../utils/getAddedLink');

const { FLOW_HANDLER_ENDPOINT, REDIS_PASSWORD } = require('../../config');
const { isNewLink } = require('../../utils/isNewLink');
const { filterAlreadySeenLink } = require('../../utils/filterAlreadySeenLink');
const { calculateMD5 } = require('../../utils/calculateMD5');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');
const { getPayloadToFlowHandlerJson } = require('./getPayloadToFlowHandlerJson');



const client = createClient({
  url: `redis://:${REDIS_PASSWORD}@diff-handler-redis:6379`,
});

client.on('error', err => console.log('Redis Client Error', err));
// used to initialize connection
client.connect();

require('./helloworld')(router);
require('./dump')(router);

router.post('/',async (req, res) => {
  var output = { state: 'init', debug: {}, error: '' };

  try {
    var req_body = req.body;
    
    output = { ...output, state: 'start', debug: req_body };

    await createDirIfNotExists(`/logs/error/glassdoor_diff_handler`);
    var filename = `/logs/error/glassdoor_diff_handler/${calculateMD5(req_body)}.json`;
    var payload = {req_body}
    await fs.writeFileSync(
      filename,
      JSON.stringify(payload),
      {encoding:'utf8'});

    myLogger.info('call to glassdoor_diff_handler');
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
