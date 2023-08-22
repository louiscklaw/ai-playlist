const fetch = require('node-fetch');
const Joi = require('joi');
const fs = require('fs');

const { storeJson } = require('../../utils/storeJson');
const { myLogger } = require('../../utils/myLogger');

const summarize_url = 'http://flow-handler:3000/jobsdb_flow_summarize';

const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];

const JOB_TITLE_UNDEFINED = 'JOB_TITLE_UNDEFINED';

const crypto = require('crypto');

function calculateMD5(object) {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(object);

  // Create a new Hash instance with 'md5' algorithm
  const md5Hash = crypto.createHash('md5');

  // Update the hash with the JSON string
  md5Hash.update(jsonString);

  // Calculate and return the hexadecimal representation of the hash digest
  return md5Hash.digest('hex');
}



// jobTitle: Joi.string().required(),
// companyName: Joi.string().required(),
// jobAddress: Joi.string().required(),
// postDate: Joi.date().iso().required(), // Assuming date format is ISO-8601
// jobHighlight: Joi.array()
//   .items(Joi.string())
//   .min(1)
//   .required(), // Assuming it's an array of strings with at least one item
// jobDescription: Joi.string().required(),
// _jobDescriptionMd: Joi.string().allow('', null), // Allowing empty or null values for this field
// jobsdb_job_url: Joi.string().uri({ allowRelative : false }).required()

const INPUT_FROM_CONTEXT_IS_NOT_VALID = 'INPUT_FROM_CONTEXT_IS_NOT_VALID';

function inputCheck(in_o) {
  try {
    const jobSchema = Joi.object({
      working_dir: Joi.string().required(),
      jobTitle: Joi.string().allow('').required(),
      companyName: Joi.string().allow('').required(),
      jobAddress: Joi.string().allow('').required(),
      postDate: Joi.string().allow(''),
      jobHighlight: Joi.string().allow('').required(),
      jobDescription: Joi.string().allow('').required(),
      _jobDescriptionMd: Joi.string().allow('', null), // Allowing empty or null values for this field
      jobsdb_job_url: Joi.string().uri({ allowRelative: false }).required(),
    }).unknown();

    // const example = {
    //   working_dir: 'path/to/working/dir',
    //   jobTitle: 'Software Engineer',
    //   companyName: 'ABC Company',
    //   jobAddress: '123 Main St, City',
    //   postDate: '2022-01-01', // Assuming ISO-8601 date format
    //   jobHighlight: 'Flexible Working Hours',
    //   jobDescription: 'Lorem ipsum dolor sit amet...',
    //   _jobDescriptionMd: '',
    //   jobsdb_job_url: 'https://example.com'
    // };

    var { jobsdb_job_url, jobTitle } = in_o;

    const { error } = jobSchema.validate(in_o);
    if (error) throw new Error(INPUT_FROM_CONTEXT_IS_NOT_VALID);

    if (!jobTitle) {
      myLogger.error(`job title undefined, url: -> ${jobsdb_job_url}`);
      throw new Error(JOB_TITLE_UNDEFINED);
    }
  } catch (error) {
    myLogger.error('%o', error);

    const md5Hash = calculateMD5(in_o);
    fs.writeFileSync(`/logs/error/flow-handler/${md5Hash}.json`, JSON.stringify(in_o), { encoding: 'utf-8' });
    myLogger.error('in_o.json write done');

    myLogger.error('%o', in_o);

    throw error;
  }
}

module.exports = {
  onExtractDone: function () {
    myLogger.info('onExtractDone called ....');

    return new Promise(async (res, rej) => {
      try {
        var {
          working_dir,
          jobTitle,
          companyName,
          jobAddress,
          postDate,
          jobHighlight,
          jobDescription,
          _jobDescriptionMd,
          jobsdb_job_url,
        } = this.context;

        inputCheck(this.context);

        var input_to_summarize = {
          working_dir,
          preprompts: SAMPLE_PREPROMPTS,
          question_list: [
            `
I will pass you a job advertisement, 
please try to summarize it in around 200 words.
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

        // // proceed to summarize
        await fetch(summarize_url, {
          method: 'post',
          body: JSON.stringify(input_to_summarize),
          headers: { 'Content-Type': 'application/json' },
        });

        res();
      } catch (error) {
        myLogger.error('error during processing Extract callback ...');
        if (error.message == JOB_TITLE_UNDEFINED) {
          myLogger.error('error as jobtitle is undefined, skipping process');
        } else {
          myLogger.error('%o', error);
        }
        rej();
      }
    });
  },
};
