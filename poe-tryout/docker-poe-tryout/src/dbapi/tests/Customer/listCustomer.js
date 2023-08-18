const fetch = require('node-fetch');

async function listCustomer() {
  const response = await fetch('http://dbapi:3001/api/v1/Customer');

  const body = await response.json();

  return body;
}

module.exports = { listCustomer };
