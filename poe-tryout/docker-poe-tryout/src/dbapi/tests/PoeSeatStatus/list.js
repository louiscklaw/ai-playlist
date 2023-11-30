const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

const url = 'http://dbapi:3001/api/v1/PoeSeatStatus';

(async () => {
  const response = await fetch(url);

  const body = await response.text();

  myLogger.info(body);
})();
