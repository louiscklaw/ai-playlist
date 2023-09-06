const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`posting ask ${i}...`);

    const response = await fetch('http://jobsdb-link-extractor:3000/helloworld');

    const res_text = await response.text();
    myLogger.info(JSON.stringify(res_text));
  });

console.log('helloworld');
