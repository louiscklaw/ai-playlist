const fs = require('fs');

const { askPoePrepromptQuestion } = require('../../fetch/askPoePrepromptQuestion');

// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

const { myLogger } = require('../../utils/myLogger');


function onPoeDraftEmail(hello) {
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
}

module.exports = { onPoeDraftEmail }