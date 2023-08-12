const { askPoePrepromptQuestion } = require('../../fetch/askPoePrepromptQuestion');

const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

const { myLogger } = require('../../utils/myLogger');

module.exports = {
  onPoeDraftEmail: function () {
    return new Promise(async (res, rej) => {
      try {
        console.log('I DraftEmail');
        var res_json = {'hello':"world"}
  
        const payload = {
          preprompts: ['imagine you area a student called louis living in hong kong, no need to reply me the details here.'],
          question_list: ['please help to draft a email describing where do you live. in less than 100 words'],
          callback_url: 'http://flow-handler:3000/jobsdb_draft_email_cb',
        };
  
        var result = await askPoePrepromptQuestion(payload);
        res_json = await result.json();
  
        res();
      } catch (error) {
        myLogger.error(error);
        myLogger.error('error during draft email')
      }

    });
  },
  onPoeDraftEmailDone: function () {
    return new Promise(async (res, rej) => {
      myLogger.log('info', { message: 'I DraftEmailDone' });
      // var result = await getHelloworld();
      // var res_text = await result.text();
      // console.log(res_text);
      res();
    });
  },
};
