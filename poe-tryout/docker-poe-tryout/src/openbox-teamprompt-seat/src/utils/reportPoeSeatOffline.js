const fetch = require('node-fetch');
const { CANONICAL_HOSTNAME, DBAPI_ENDPOINT } = require('../config');
const { myLogger } = require('./myLogger');

async function reportOffline() {
  const url = `${DBAPI_ENDPOINT}/PoeSeatStatus/offline/${CANONICAL_HOSTNAME}`;

  const response = await fetch(url, {
    method: 'patch',
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    const data = await response.json();
    console.log(data);

    myLogger.info(JSON.stringify(data));
  } catch (error) {
    myLogger.error(await response.text());
  }
}

module.exports = { reportOffline };
