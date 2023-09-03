const fs = require('fs'),
  path = require('path');

const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');
// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

const { myLogger } = require('../../../utils/myLogger');
const { checkInput } = require('./checkInput');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { loadJson, loadMetaJson } = require('../../../utils/loadJson');

const { writeEmail } = require('./writeEmail');
const { writeEmailMarkdown } = require('./writeEmailMarkdown');

const ERROR_LOG_DIR = __dirname.replace('/app', '/logs/error');

// route/jobsdb_draft_email_cb.js
function onPoeDraftEmailDone() {
  return new Promise(async (res, rej) => {
    var output = { 
      state: 'init', 
      debug:{
        context: this.context
      }, 
      error: '' };

    try {
      // http://flow-handler:3000/jobsdb_draft_email_cb
      myLogger.info('DraftEmailDone... ');
      
      const { working_dir } = this.context;
      if (!working_dir) {
        myLogger.info('working_dir is not defined, default to /share/testing');
        working_dir = '/share/testing';
      }

      const context = this.context;

      // var meta_json = await loadJson(`${working_dir}/meta.json`);
      var meta_json = await loadMetaJson(working_dir);
      myLogger.info(`job url: ${meta_json.jobsdb_job_url}`);

      // checkInput(context);
      console.log(context.chat_history.q_and_a);

      var email_content = '';
      
      // var { reply, md_reply } = context.chat_history.q_and_a.history[0].answer;

      myLogger.error('RESUME ME')
      // if (Object.keys(context.chat_history.q_and_a.history[0].answer).includes('md_reply') > -1) {
      //   var { md_reply } = context.chat_history.q_and_a.history[0].answer;
      //   email_content = md_reply.join('\n\n');
      //   await writeEmailMarkdown(working_dir, email_content)

      // }else if (Object.keys(context.chat_history.q_and_a.history[0].answer).includes('reply') > -1){
      //   var { reply } = context.chat_history.q_and_a.history[0].answer;
      //   email_content = reply;
      //   await writeEmail(working_dir, email_content)

      // }else {
      //   email_content = context.chat_history.q_and_a.history[0].answer
      //   await writeEmail(working_dir, email_content)
      // }

      res();
    } catch (error) {
      output = { ...output, state: 'error', error: JSON.stringify(error) };

      myLogger.error('error during draft email...');
      console.log(error);

      await createDirIfNotExists(ERROR_LOG_DIR);

      var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
      await fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });
      myLogger.error(filename);

      myLogger.error(JSON.stringify(error));
      throw error;
    }
  });
}

module.exports = {
  onPoeDraftEmailDone,
};
