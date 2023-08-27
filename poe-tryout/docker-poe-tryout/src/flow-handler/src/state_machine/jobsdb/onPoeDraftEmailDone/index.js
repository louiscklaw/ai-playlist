const fs = require('fs');

const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');

// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

const { myLogger } = require('../../../utils/myLogger');

function onPoeDraftEmailDone() {
  return new Promise(async (res, rej) => {
    // http://flow-handler:3000/jobsdb_draft_email_cb
    myLogger.log('info', { message: 'I DraftEmailDone' });
    // var result = await getHelloworld();
    // var res_text = await result.text();
    // console.log(res_text);
    res();
  });
}

module.exports = {
  onPoeDraftEmailDone
};
