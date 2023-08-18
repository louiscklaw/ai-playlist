const request = require('request');
var rp = require('request-promise');

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
    console.log(error);
  }
}

module.exports = { queryCustomer };
