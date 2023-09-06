const fs = require('fs');
const { postGlassdoorLinkExtract } = require('../../utils/postGlassdoorLinkExtract');
const { createClient } = require('redis');
const express = require('express');
const router = express.Router();
const { myLogger } = require('../../utils/myLogger');

const { getAddedLink } = require('../../utils/getAddedLink');

const { REDIS_PASSWORD } = require('../../config');
// const { isNewLink } = require('../../utils/isNewLink');
const { filterAlreadySeenLink } = require('../../utils/filterAlreadySeenLink');
const { calculateMD5 } = require('../../utils/calculateMD5');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');
const { getPayloadToFlowHandlerJson } = require('./getPayloadToFlowHandlerJson');
const { DONE, ERROR, INIT, START } = require('../../constants');

const client = createClient({
  url: `redis://:${REDIS_PASSWORD}@diff-handler-redis:6379`,
});

client.on('error', err => console.log('Redis Client Error', err));
// used to initialize connection


require('./helloworld')(router);
require('./dump')(router);

router.post('/', async (req, res) => {
  myLogger.info('call to glassdoor_diff_handler');

  var output = { state: INIT, debug: {}, error: '' };

  try {
    var req_body = req.body;


    client.connect();

    output = { ...output, state: START, debug: req_body };

    await createDirIfNotExists(`/logs/error/glassdoor_diff_handler`);
    var filename = `/logs/error/glassdoor_diff_handler/${calculateMD5(req_body)}.json`;
    var payload = { req_body };
    await fs.writeFileSync(filename, JSON.stringify(payload), { encoding: 'utf8' });

    const json_message = req_body.message;
    const messages = json_message.split(/\n/);
    const sainted_links = getAddedLink(messages);
    console.log({sainted_links});

    // filter out done here ?
    const new_links = await filterAlreadySeenLink(sainted_links, client);

    const flow_handler_payloads = new_links.map(link => {
      return getPayloadToFlowHandlerJson(link);
    });
    myLogger.info(JSON.stringify(flow_handler_payloads));

    flow_handler_payloads.forEach(async pl => {
      try {
        myLogger.info(`going to send postGlassdoorLinkExtract -> `);
        myLogger.info(JSON.stringify(pl));

        await postGlassdoorLinkExtract(pl);
      } catch (error) {
        myLogger.error(JSON.stringify({pl, error: error.message}));

        throw error;
      }
    });

    output = { ...output, state: DONE };
  } catch (error) {
    myLogger.error('error occur in diff-handler');
    myLogger.error(JSON.stringify(error));
    
    output = { ...output, state: ERROR, error: JSON.stringify(error) };

  }

  res.send(output);
});

module.exports = router;
