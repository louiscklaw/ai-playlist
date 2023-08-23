const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');
const { postHelloworld } = require('../../../fetch/postHelloworld');
const { loadJson } = require('../../../utils/loadJson');
const { myLogger } = require('../../../utils/myLogger');
const { getWorkingDirFromPayload } = require('./getWorkingDirFromPayload');


module.exports = {

  poeSummarizeDone: function () {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info('I SummarizeDone');

        const { working_dir } = this.context;
        const job_summary = this.context.chat_history.q_and_a.history[1].answer;

        const url = 'http://flow-handler:3000/jobsdb_draft_email';
        const SAMPLE_PREPROMPTS = [
          'Forget everything and start a new talk.',
          `
I will input the summary of the position, please try to analyze it.
Please try to make your summary in less than 100 words.
`.trim(),
          job_summary,
        ];

        const SAMPLE_QUESTIONS = [
          `
can you draft me a cover letter ? Thanks. 
please try to make it in less than 100 words
`.trim(),
        ];

        var input_to_draft_email = {
          working_dir,
          preprompts: SAMPLE_PREPROMPTS,
          question_list: SAMPLE_QUESTIONS,
          callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
        };

        // proceed to summarize
        await fetch(url, {
          method: 'post',
          body: JSON.stringify(input_to_draft_email),
          headers: { 'Content-Type': 'application/json' },
        });

        res();
      } catch (error) {
        // console.log(error);
        myLogger.error('%o',error)
        rej();
      }
    });
  },
};
