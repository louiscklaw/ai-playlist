const { askPoePrepromptQuestion } = require('../../fetch/askPoePrepromptQuestion');
const { postHelloworld } = require('../../fetch/postHelloworld');
const { myLogger } = require('../../utils/myLogger');

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
        res();
      } catch (error) {
        console.log(error);
        rej();
      }
    });
  },
};
