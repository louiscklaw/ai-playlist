const fs = require('fs');

const { askPoePrepromptQuestion } = require('../../fetch/askPoePrepromptQuestion');

// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

const { myLogger } = require('../../utils/myLogger');

module.exports = {
  onPoeDraftEmail: function (hello) {
    return new Promise(async (res, rej) => {
      try {
        console.log('I DraftEmail');
        const { req_body } = this.context;
        var payload = req_body;

        // var working_dir = '/share/helloworld'
        // var summary_result_json_filename = 'summary_result.json'
        // var summary_result = await fs.readFileSync()

        var result = await askPoePrepromptQuestion(payload);
        // res_json = await result.json();

        res();
      } catch (error) {
        myLogger.error('error during draft email');
        console.log(error);
      }
    });
  },
  // onPoeDraftEmailDone: function () {
  //   return new Promise(async (res, rej) => {
  //     // http://flow-handler:3000/jobsdb_draft_email_cb
  //     myLogger.log('info', { message: 'I DraftEmailDone' });
  //     // var result = await getHelloworld();
  //     // var res_text = await result.text();
  //     // console.log(res_text);
  //     res();
  //   });
  // },
};
