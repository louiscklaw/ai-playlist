const fetch = require('node-fetch');

(async () => {
  const response = await fetch(
    'http://localhost:3001/api/v1/Log/count');
  const body = await response.text();

  console.log(body);
})();
