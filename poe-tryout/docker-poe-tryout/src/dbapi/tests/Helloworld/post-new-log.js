const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

Array(100)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`writing log ${i}...`);
    const body = { level: 'info', comment: 'log comment ?' };

    const response = await fetch('http://dbapi:3001/api/v1/Log', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await response.json();
  });
