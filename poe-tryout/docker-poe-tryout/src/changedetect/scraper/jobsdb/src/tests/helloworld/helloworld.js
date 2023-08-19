const fetch = require('node-fetch');

const HELLOWORLD_URL = 'http://jobsdb-scraper:3000/helloworld';

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch(HELLOWORLD_URL);

    const res_text = await response.text();
    console.log({ res_text });
  });
