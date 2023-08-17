const fetch = require('node-fetch');

// NOTE: simulate the response from poe-scheduler

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`report-job-complete ${i}...`);

    const response = await fetch('http://flow-handler:3000/report-job-complete', {
      method: 'post',
      body: JSON.stringify({
        hello: 'world',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.json());
  });
