// const fetch = require('node-fetch');
const Joi = require('joi');
const fs = require('fs');

// const { storeJson } = require('../../../utils/storeJson');
const { myLogger } = require('../../../utils/myLogger');
const { calculateMD5 } = require('../../../utils/calculateMD5');

// const summarize_url = 'http://flow-handler:3000/jobsdb_flow_summarize';
// const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];
const JOB_TITLE_UNDEFINED = 'JOB_TITLE_UNDEFINED';
const INPUT_FROM_CONTEXT_IS_NOT_VALID = 'INPUT_FROM_CONTEXT_IS_NOT_VALID';

function inputSchema(in_o) {
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

module.exports = { inputSchema };
