const { askPoePrepromptQuestion } = require('../../fetch/askPoePrepromptQuestion');
const { postHelloworld } = require('../../fetch/postHelloworld');
const { myLogger } = require('../../utils/myLogger');

const url = 'http://flow-handler:3000/jobsdb_draft_email';
const SAMPLE_PREPROMPTS = [
'Forget everything and start a new talk.',
`
I will input the summary of the position, 
can you draft me a cover letter ? 
Please try to make it in less than 100 words.
`.trim(),
`
Louislabs company is hiring a validation engineer. 
The key responsibilities include assisting in planning and executing qualification and validation activities, 
as well as preparing qualification protocols and reports for production equipment, facilities, and utilities. 
The desired qualification is a bachelor's degree in Engineering, Pharmaceutical, or a related science discipline, 
and fresh graduates are welcome to apply.
`.trim()
]

const SAMPLE_QUESTIONS = [
  'please help to draft a email describing where do you live. in less than 50 words'
]


module.exports = {
  onPoeSummarize: function () {
    return new Promise(async (res, rej) => {
      try {
        console.log('I Summarize');
        const { req_body } = this.context;
        var payload = req_body;
        console.log({req_body});

        var result = await askPoePrepromptQuestion(payload);

        res();
      } catch (error) {
        myLogger.error('error during draft email');
        console.log(error);

        rej();
      }
    });
  },
  onPoeSummarizeDone: function () {
    return new Promise(async (res, rej) => {
      try {
        console.log('I SummarizeDone');

        const {working_dir} = this.context;

        // proceed to summarize
        await fetch(url, {
          method: 'post',
          body: JSON.stringify({
            working_dir,
            preprompts: SAMPLE_PREPROMPTS,
            question_list: SAMPLE_QUESTIONS,
            callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        res();
      } catch (error) {
        console.log(error);
        rej();
      }
    });
  },
};
