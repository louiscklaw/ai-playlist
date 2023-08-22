const fetch = require('node-fetch');
// const Joi = require('joi');
// const fs = require('fs');

const { storeJson } = require('../../../utils/storeJson');
const { myLogger } = require('../../../utils/myLogger');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { inputSchema } = require('./inputSchema');

const summarize_url = 'http://flow-handler:3000/jobsdb_flow_summarize';
const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];
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

        var input_to_summarize = {
          working_dir,
          preprompts: SAMPLE_PREPROMPTS,
          question_list: [
            `
I will pass you a job advertisement, 
please try to summarize it in around 200 words.
`.trim(),
            `
company name: ${companyName}
job title: ${jobTitle}
job addess: ${jobAddress}
post date: ${postDate}
job highlight: ${jobHighlight}

job description (markdown):
\`\`\`
${_jobDescriptionMd}
\`\`\`
`.trim(),
          ],
          callback_url: 'http://flow-handler:3000/jobsdb_flow_summarize_cb',
        };

        await storeJson(`${working_dir}/input_to_summarize.json`, input_to_summarize);

        // // proceed to summarize
        await fetch(summarize_url, {
          method: 'post',
          body: JSON.stringify(input_to_summarize),
          headers: { 'Content-Type': 'application/json' },
        });

        res();
      } catch (error) {
        myLogger.error('error during processing Extract callback ...');
        if (error.message == JOB_TITLE_UNDEFINED) {
          myLogger.error('error as jobtitle is undefined, skipping process');
        } else {
          myLogger.error('%o', error);
        }
        rej();
      }
    });
  },
};
