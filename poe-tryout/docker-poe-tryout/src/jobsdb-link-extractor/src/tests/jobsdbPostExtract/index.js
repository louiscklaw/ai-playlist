const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

const urls = ['https://hk.jobsdb.com/hk/en/job/validation-engineer-qa-100003010527848'];

urls.map(async (v, i) => {
  myLogger.info(`posting ask ${i}...`);

  const response = await fetch('http://jobsdb-link-extractor:3000/jobsdbPostExtract', {
    method: 'post',
    body: JSON.stringify({ url: urls[i] }),
    headers: { 'Content-Type': 'application/json' },
  });

  const res_json = await response.json();
  const { extracted } = res_json;
  myLogger.info('%o', { extracted });
});
