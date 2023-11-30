const { myLogger } = require('./myLogger');
const { fetchGlassdoorPost } = require('./fetchGlassdoorPost');

const { FLOW_HANDLER_ENDPOINT } = require('../config');

function postGlassdoorLinkExtract(json_body) {
  myLogger.info('postGlassdoorLinkExtract');

  try {
    myLogger.info(JSON.stringify({ json_body }));

    return fetchGlassdoorPost(`${FLOW_HANDLER_ENDPOINT}/glassdoor_link_extract`, json_body);
  } catch (error) {
    myLogger.error(JSON.stringify({ json_body, error }));

    throw error;
  }
}

module.exports = { postGlassdoorLinkExtract };
