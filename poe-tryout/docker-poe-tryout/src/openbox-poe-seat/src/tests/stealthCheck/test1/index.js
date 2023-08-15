const fetch = require('node-fetch');

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);
    const url = 'http://openbox-poe-seat1:3000/stealthCheck';
    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify({ hello: 'world' }),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    console.log({ res_json });
  });
