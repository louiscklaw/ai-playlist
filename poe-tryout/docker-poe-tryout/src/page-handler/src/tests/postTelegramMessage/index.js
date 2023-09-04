const fetch = require('node-fetch');

const { myLogger } = require('../../utils/myLogger');

var message =
  '🔔🔔🔔 job done  🔔🔔🔔\n' +
  'job url: https://hk.jobsdb.com/hk/en/job/automation-hardware-engineer-ai-lab-979005-100003010505170\n' +
  'job working_dir: /share/100003010505170 :\n' +
  '\n' +
  '```javascript\n' +
  '{\n' +
  '  "companyName": "Endeavour Search Limited",\n' +
  '  "jobAddress": "Shatin Area",\n' +
  '  "jobTitle": "Automation Hardware Engineer (AI Lab Solution) – Global Life Science Intelligent Innovation Firm"\n' +
  '}\n' +
  '```';
// .trim();

const payload = {
  text: message,
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`post-telegram-message page-handler ${i}...`);

    const response = await fetch('http://page-handler:3000/post-telegram-message', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'content-type': 'application/json' },
    });

    const res_json = await response.json();
    myLogger.info('%o', { res_json });
  });
