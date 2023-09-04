// const fetch = require('node-fetch');
const Joi = require('joi');
const fs = require('fs'),
  path = require('path');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

// const { storeJson } = require('../../../utils/storeJson');
const { myLogger } = require('../../../utils/myLogger');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');

// const summarize_url = 'http://flow-handler:3000/jobsdb_flow_summarize';
// const SAMPLE_PREPROMPTS = ['Forget everything and start a new talk.'];
const JOB_TITLE_UNDEFINED = 'JOB_TITLE_UNDEFINED';
const INPUT_FROM_CONTEXT_IS_NOT_VALID = 'INPUT_FROM_CONTEXT_IS_NOT_VALID';

function inputSchema(in_o) {
  var output = {state:"init", debug:in_o, error:""}
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
    myLogger.error(JSON.stringify(error));
    output = { ...output, state: 'error', error: JSON.stringify(error) };

    createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
    fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

    throw error;
  }
}

module.exports = { inputSchema };
