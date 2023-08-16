const fetch = require('node-fetch');
const { storeJson } = require('../../utils/storeJson');

const url = 'http://flow-handler:3000/jobsdb_flow_summarize';

const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];

module.exports = {
  onExtractDone: function () {
    console.log('onExtractDone called ....');

    return new Promise(async (res, rej) => {
      try {
        const { working_dir, jobTitle, companyName, jobAddress, postDate, jobHighlight, jobDescription, 
          _jobDescriptionMd } = this.context;

        var input_to_summarize = {
          working_dir,
          preprompts: SAMPLE_PREPROMPTS,
          question_list: [
            `
I will input a job advertisement, 
please try to summarize it in around 100 words
`.trim(),
            `
company name: ${companyName}
job title: ${jobTitle}
job addess: ${jobAddress}
post date: ${postDate}
job highlight: ${jobHighlight}

job description (markdown):
\`\`\`
${_jobDescriptionMd}
\`\`\`
`.trim(),
          ],
          callback_url: 'http://flow-handler:3000/jobsdb_flow_summarize_cb',
        };

        await storeJson(`${working_dir}/input_to_summarize.json`, input_to_summarize);

        // proceed to summarize
        await fetch(url, {
          method: 'post',
          body: JSON.stringify(input_to_summarize),
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
