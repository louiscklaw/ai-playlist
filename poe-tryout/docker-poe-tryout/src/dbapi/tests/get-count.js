const fetch = require('node-fetch');

(async () => {
  const response = await fetch('http://dbapi:3001/api/v1/JobPost/count');
  const body = await response.text();

  console.log(body);
})();
