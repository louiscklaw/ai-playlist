const fetch = require('node-fetch');

const { myLogger } = require('../../utils/myLogger');

var message = `
✔️ job done 🔔🔔🔔
job url: ${'jobsdb_job_url'}
job working_dir: ${'working_dir'} :

\`\`\`javascript
${JSON.stringify({"Hello":"world"})}
\`\`\`
`.trim();

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
