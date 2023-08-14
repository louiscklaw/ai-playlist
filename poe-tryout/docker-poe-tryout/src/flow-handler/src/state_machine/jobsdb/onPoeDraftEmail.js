const fs = require('fs');

const { askPoePrepromptQuestion } = require('../../fetch/askPoePrepromptQuestion');

// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

const { myLogger } = require('../../utils/myLogger');

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
  onPoeDraftEmail: function (hello) {
    return new Promise(async (res, rej) => {
      try {
        console.log('I DraftEmail');
        const {req_body} = this.context;
        var payload = req_body
  
        // var working_dir = '/share/helloworld'
        // var summary_result_json_filename = 'summary_result.json'
        // var summary_result = await fs.readFileSync()
  
        var result = await askPoePrepromptQuestion(payload);
        // res_json = await result.json();
  
        res();
      } catch (error) {
        myLogger.error('error during draft email')
        console.log(error);
      }

    });
  },
  onPoeDraftEmailDone: function () {
    return new Promise(async (res, rej) => {
      // http://flow-handler:3000/jobsdb_draft_email_cb
      myLogger.log('info', { message: 'I DraftEmailDone' });
      // var result = await getHelloworld();
      // var res_text = await result.text();
      // console.log(res_text);
      res();
    });
  },
};
