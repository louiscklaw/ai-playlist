const fetch = require('node-fetch');

async function getCustomerCount() {
  const response = await fetch('http://dbapi:3001/api/v1/Customer/count');

  const body = await response.json();

  return body;
}

module.exports = { getCustomerCount };
