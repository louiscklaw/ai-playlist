const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

(async () => {
  const response = await fetch('http://localhost:3001/api/v1/Log');
  const body = await response.text();
  myLogger.info(body);
})();
