const { postHelloworld } = require('../../fetch/postHelloworld');

module.exports = {
  onSummarize: function () {
    return new Promise(async (res, rej) => {
      console.log('I Summarize');
      res();
    });
  },
  onSummarizeDone: function () {
    return new Promise(async (res, rej) => {
      console.log('I SummarizeDone');
      res();
    });
  },
};

