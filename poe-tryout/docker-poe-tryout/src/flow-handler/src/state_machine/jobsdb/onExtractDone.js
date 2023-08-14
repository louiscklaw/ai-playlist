const fetch = require('node-fetch');

const url = 'http://flow-handler:3000/jobsdb_flow_summarize';

const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];

module.exports = {
  onExtractDone: function () {
    console.log('onExtractDone called ....');

    return new Promise(async (res, rej) => {
      try {
        const {working_dir} = this.context;
        console.log(this.context);

        // proceed to summarize
        await fetch(url, {
          method: 'post',
          body: JSON.stringify({
            working_dir,
            preprompts: SAMPLE_PREPROMPTS,
            question_list: [
`
I will input some text, 
please try to summarize it in around 50 words
`.trim(),
`
We are louislabs company, we are hiring a validation engineer

The Key Roles and Responsibilities of this position:

Assist in planning and executing qualification and validation activities
Prepare qualification protocols and SAMPLE_QUESTIONSreports for production equipment, facilities and utilities

The Qualification and Experience needed:

Bachelor’s degree in Engineering, Pharmaceutical or other related science discipline
Fresh graduates are welcome
`.trim(),
            ],
            callback_url: 'http://flow-handler:3000/jobsdb_flow_summarize_cb',
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
