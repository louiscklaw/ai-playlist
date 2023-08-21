const fetch = require('node-fetch');

const urls = ['https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868'];

const { myLogger } = require('../../utils/myLogger');

urls.map(async (v, i) => {
  myLogger.info(`posting ask ${i}...`);

  const response = await fetch('http://page-handler:3000/jobsdbPostExtract', {
    method: 'post',
    body: JSON.stringify({ url: urls[i] }),
    headers: { 'Content-Type': 'application/json' },
  });

  const res_json = await response.json();
  const { extracted } = res_json;
  myLogger.info('%o', { extracted });
});
