var rp = require('request-promise');
const { myLogger } = require('../../utils/myLogger');

async function getJobsdbDoneListByLink(link_to_lookup) {
  try {
    var option = {
      url: 'http://dbapi:3001/api/v1/JobsdbDoneList',
      qs: {
        query: JSON.stringify({ link: link_to_lookup }),
      },
    };

    const resp = await rp(option);

    return JSON.parse(resp);
  } catch (error) {
    myLogger.info(error);
  }
}

module.exports = { getJobsdbDoneListByLink };
