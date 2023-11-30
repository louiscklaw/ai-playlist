const fetch = require('node-fetch');
const { CANONICAL_HOSTNAME, DBAPI_ENDPOINT } = require('../config');
const { myLogger } = require('./myLogger');

async function reportOnline() {
  const url = `${DBAPI_ENDPOINT}/PoeSeatStatus/online/${CANONICAL_HOSTNAME}`;
  myLogger.debug(url);

  const response = await fetch(url, {
    method: 'patch',
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    const data = await response.json();
    myLogger.info(JSON.stringify(data));
  } catch (error) {
    myLogger.error(await response.text());
  }
}

module.exports = { reportOnline };
