const request = require('request');
var rp = require('request-promise');
const { myLogger } = require('../../utils/myLogger');

async function queryCustomer() {
  try {
    var option = {
      url: 'http://dbapi:3001/api/v1/Customer',
      qs: {
        query: JSON.stringify({
          name: 'new-customer',
        }),
      },
    };

    const resp = await rp(option);

    return JSON.parse(resp);
  } catch (error) {
    myLogger.info(error);
  }
}

module.exports = { queryCustomer };
