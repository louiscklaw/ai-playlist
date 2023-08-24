const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

(async () => {
  const response = await fetch('http://dbapi:3001/api/v1/JobPost/count');
  const body = await response.text();

  myLogger.info(body);
})();
