const fs = require('fs'),
  path = require('path');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

const { FLOW_HANDLER_ENDPOINT } = require('../../../config');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { myLogger } = require('../../../utils/myLogger');
const SummaryPrompts = require('./SummaryPrompts');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');

module.exports = {
  poeSummarizeDone: function () {
    return new Promise(async (res, rej) => {
      var output = { state: 'init', debug: this.context, error: '' };

      try {
        myLogger.info('I SummarizeDone');

        const { working_dir } = this.context;
        const job_summary = this.context.chat_history.q_and_a.history[1].answer;

        console.log({job_summary});
        console.log(`TODO: replace ${FLOW_HANDLER_ENDPOINT}`);
        // const prompts = new SummaryPrompts(job_summary);

        const url = 'http://flow-handler:3000/jobsdb_draft_email';
        var input_to_draft_email = {
          working_dir,
          preprompts: 
[
  'Forget everything and start a new talk.',
  `I will input the summary of the position, please try to analyze it.`,
  job_summary,
],
          question_list: 
[
  `Can you draft me a cover letter ? Thanks.
Please output it in markdown format and keep it in under 200 words.`.trim(),
],
          callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
        };

        console.log(`TODO: replace ${FLOW_HANDLER_ENDPOINT}`);
        console.log({ input_to_draft_email });

        // proceed to summarize
        await fetch(url, {
          method: 'post',
          body: JSON.stringify(input_to_draft_email),
          headers: { 'Content-Type': 'application/json' },
        });

        res();
      } catch (error) {
        output = { ...output, state: 'error', error: JSON.stringify(error) };

        await createDirIfNotExists(ERROR_LOG_DIR);

        var filename = `${ERROR_LOG_DIR}/poeSummarizeDone.json`;
        fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

        myLogger.error('error during summarize');
        myLogger.error(JSON.stringify(error));
        rej();
      }
    });
  },
};

//         const SAMPLE_PREPROMPTS = [
//           'Forget everything and start a new talk.',
//           `
// I will input the summary of the position, please try to analyze it.
// Please try to make your summary in less than 100 words.
// `.trim(),
//           job_summary,
//         ];
// const SAMPLE_PREPROMPTS = getSamplePrompts(job_summary)

//         const SAMPLE_QUESTIONS1 = [
//           `
// can you draft me a cover letter ? Thanks.
// please try to make it in less than 100 words
// `.trim(),
//         ];
// const SAMPLE_QUESTIONS = getSamplePrompts(job_summary)
