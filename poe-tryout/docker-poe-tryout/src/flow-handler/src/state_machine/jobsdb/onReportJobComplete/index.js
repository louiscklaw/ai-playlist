const fs = require('fs');
const { loadJson } = require('../../utils/loadJson');
const { getJobInfo } = require('./getJobInfo');
const { postTelegramMessage } = require('../../../utils/postTelegramMessage');
const { myLogger } = require('../../../utils/myLogger');

function onReportJobComplete() {
  return new Promise(async (res, rej) => {
    try {
      myLogger.info('report job complete...');

      const { working_dir } = this.context;
      // myLogger.info(this.context);
      var meta_json = await loadJson(`${working_dir}/meta.json`);
      myLogger.info(`job url: ${meta_json.jobsdb_job_url}`);

      const { companyName, jobAddress, jobTitle } = await getJobInfo(working_dir);

      var message = `
      🔔🔔🔔 job done  🔔🔔🔔
job url: ${meta_json.jobsdb_job_url}
job working_dir: ${meta_json.working_dir} :

\`\`\`javascript
${JSON.stringify({ companyName, jobAddress, jobTitle }, null, 2)}
\`\`\`
`.trim();
      await postTelegramMessage(message);

      res();
    } catch (error) {
      myLogger.error('error during report job complete...');
      myLogger.error('%o', error);
      // myLogger.error(JSON.stringify(error));

      rej();
    }
  });
}

module.exports = { onReportJobComplete };
