const fs = require('fs');
const ERROR_LOG_DIR = '/logs/error/onExtractDone';
const { storeJson } = require('../../../utils/storeJson');
const { myLogger } = require('../../../utils/myLogger');
const { inputSchema } = require('./inputSchema');
const ExtractPrompts = require('./ExtractPrompts');
const { postToSummarize } = require('./postToSummarize');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');

const summarize_cb_url = 'http://flow-handler:3000/jobsdb_flow_summarize_cb';

// const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];
const JOB_TITLE_UNDEFINED = 'JOB_TITLE_UNDEFINED';
// const INPUT_FROM_CONTEXT_IS_NOT_VALID = 'INPUT_FROM_CONTEXT_IS_NOT_VALID';

module.exports = {
  onExtractDone: function () {
    myLogger.info('onExtractDone called ....');

    return new Promise(async (res, rej) => {
      try {
        var { working_dir, jobTitle, companyName, jobAddress, postDate, jobHighlight, _jobDescriptionMd } =
          this.context;

        inputSchema(this.context);

        const prompts = new ExtractPrompts(
          companyName,
          jobTitle,
          jobAddress,
          postDate,
          jobHighlight,
          _jobDescriptionMd,
        );

        await storeJson(`${working_dir}/input_to_summarize.json`, input_to_summarize);
        await postToSummarize({
          working_dir,
          preprompts: prompts.getSamplePreprompts(),
          question_list: prompts.getSampleQuestions(),
          callback_url: summarize_cb_url,
        });

        res();
      } catch (error) {
        myLogger.error('error during processing Extract callback ...');

        if (error.message == JOB_TITLE_UNDEFINED) {
          myLogger.error('error as jobtitle is undefined, skipping process');
        } else {
          await createDirIfNotExists(ERROR_LOG_DIR);

          var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
          var payload = this.context;

          fs.writeFileSync(filename, JSON.stringify({ payload, error }), { encoding: 'utf8' });
          myLogger.error('%o', error);
        }

        rej();
      }
    });
  },
};
