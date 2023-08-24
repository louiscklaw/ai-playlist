const fetch = require('node-fetch');

const { myLogger } = require('../../utils/myLogger');

// var message = `
// 🔔🔔🔔 job done  🔔🔔🔔
// job url: ${meta_json.jobsdb_job_url}
// job working_dir: ${working_dir} :

// \`\`\`javascript
// ${JSON.stringify({ companyName, jobAddress, jobTitle }, null, 2)}
// \`\`\`
// `.trim();

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`telegram-send-message page-handler ${i}...`);

    const response = await fetch('http://page-handler:3000/telegram-send-message');

    const res_text = await response.text();
    myLogger.info('%o', { res_text });
  });
