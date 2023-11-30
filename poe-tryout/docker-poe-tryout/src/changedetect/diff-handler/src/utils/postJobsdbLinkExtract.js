const { myLogger } = require('./myLogger');
const { fetchPost } = require('./fetchPost');

const { FLOW_HANDLER_ENDPOINT } = require('../config');

function postJobsdbLinkExtract(json_body) {
  try {
    myLogger.info('postJobsdbLinkExtract');
    myLogger.info({ json_body });

    return fetchPost(`${FLOW_HANDLER_ENDPOINT}/jobsdb_link_extract`, json_body);
  } catch (error) {
    console.log({json_body, error});
    throw new Error(JSON.stringify(error))
  }
}

module.exports = { postJobsdbLinkExtract };
