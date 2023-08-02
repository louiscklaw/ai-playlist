const fetch = require('node-fetch');

Array(10).fill(0).forEach(() => {
  Array(100).fill(0).forEach(async () => {
    const body = { level: 'info', comment: 'log comment ?' };

    const response = await fetch(
      'http://localhost:3001/api/v1/Log',
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
      });

    const data = await response.json();
  })
})
