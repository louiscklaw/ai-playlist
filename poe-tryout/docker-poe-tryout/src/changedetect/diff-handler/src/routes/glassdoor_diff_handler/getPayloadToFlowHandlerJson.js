const { myLogger } = require('../../utils/myLogger');
const { FLOW_HANDLER_ENDPOINT } = require('../../config');

function getPayloadToFlowHandlerJson(diff_link) {
  try {
    return {
      glassdoor_job_url: diff_link,
      callback_url: `${FLOW_HANDLER_ENDPOINT}/glassdoor_link_extract_cb`,
    };
  } catch (error) {
    myLogger.error(JSON.stringify(error));
    myLogger.error(JSON.stringify(diff_link));
  }
}

module.exports = { getPayloadToFlowHandlerJson };
