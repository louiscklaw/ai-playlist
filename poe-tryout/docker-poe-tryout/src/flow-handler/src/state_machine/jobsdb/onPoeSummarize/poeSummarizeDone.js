const { FLOW_HANDLER_ENDPOINT } = require('../../../config');
const { myLogger } = require('../../../utils/myLogger');
const SummaryPrompts = require('./SummaryPrompts');

module.exports = {
  poeSummarizeDone: function () {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info('I SummarizeDone');

        const { working_dir } = this.context;
        const job_summary = this.context.chat_history.q_and_a.history[1].answer;

        console.log(`TODO: replace ${FLOW_HANDLER_ENDPOINT}`);
        const url = 'http://flow-handler:3000/jobsdb_draft_email';

        const prompts = new SummaryPrompts(job_summary);

        var input_to_draft_email = {
          working_dir,
          preprompts: prompts.getSamplePreprompts(),
          question_list: prompts.getSampleQuestions(),
          callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
        };

        console.log(`TODO: replace ${FLOW_HANDLER_ENDPOINT}`);

        // proceed to summarize
        await fetch(url, {
          method: 'post',
          body: JSON.stringify(input_to_draft_email),
          headers: { 'Content-Type': 'application/json' },
        });

        res();
      } catch (error) {
        // console.log(error);
        myLogger.error('%o', error);
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
