const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

const { API_DEBUG_ENDPOINT } = process.env;
if (!API_DEBUG_ENDPOINT) throw new Error('API_ENDPOINT_NOT_DEFINED');

console.log();
Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`posting ask ${i}...`);

    const response = await fetch(`${API_DEBUG_ENDPOINT}/helloworld`);

    const res_text = await response.text();
    myLogger.info('%o', { res_text });
  });

console.log('helloworld');
