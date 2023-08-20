const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

const { API_DEBUG_ENDPOINT } = process.env;

const urls = ['https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868'];

urls.map(async (v, i) => {
  myLogger.info(`posting ask ${i}...`);

  const response = await fetch(`${API_DEBUG_ENDPOINT}/jobsdbPostExtract`, {
    method: 'post',
    body: JSON.stringify({ url: urls[i] }),
    headers: { 'Content-Type': 'application/json' },
  });

  const res_json = await response.json();
  const { extracted } = res_json;
  myLogger.info({ extracted });
});
