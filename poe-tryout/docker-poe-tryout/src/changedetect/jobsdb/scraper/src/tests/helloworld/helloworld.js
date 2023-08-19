const fetch = require('node-fetch');

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://jobsdb-scraper:3000/helloworld');

    const res_text = await response.text();
    console.log({ res_text });
  });
