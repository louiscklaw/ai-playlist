const fs = require('fs'),
  path = require('path');

const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');

// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

const { myLogger } = require('../../../utils/myLogger');
const { checkInput } = require('./checkInput');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { loadJson } = require('../../../utils/loadJson');
const ERROR_LOG_DIR = __dirname.replace('/app', '/logs/error');

function onPoeDraftEmailDone() {
  return new Promise(async (res, rej) => {
    var output = { state: 'init', debug: this.context, error: '' };

    try {
      // http://flow-handler:3000/jobsdb_draft_email_cb
      myLogger.info('DraftEmailDone... 111');
      const { working_dir } = this.context;
      const context = this.context;
      const email_md_filename = `${working_dir}/401_email.md`;

      var meta_json = await loadJson(`${working_dir}/meta.json`);
      myLogger.info(`job url: ${meta_json.jobsdb_job_url}`);

      checkInput(context);
      var email_content = context.chat_history.q_and_a.history[0].answer;

      myLogger.info(`writing content into ${email_md_filename}`);
      await fs.writeFileSync(email_md_filename, email_content, { encoding: 'utf8' });

      res();
    } catch (error) {
      console.log(error);
      output = { ...output, state: 'error', error: JSON.stringify(error) };
      myLogger.error('error during draft email...');

      await createDirIfNotExists(ERROR_LOG_DIR);

      var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
      await fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

      myLogger.error(JSON.stringify(error));
      throw error;
    }
  });
}

module.exports = {
  onPoeDraftEmailDone,
};
