const fs = require('fs');
const Joi = require('joi');

const INPUT_FROM_CONTEXT_IS_NOT_VALID = 'INPUT_FROM_CONTEXT_IS_NOT_VALID'

var myLogger = console

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
    myLogger.error(JSON.stringify(error));
    myLogger.error('%o', in_o);
    
    // fs.writeFileSync('/logs/error/flow-handler/in_o.json',JSON.stringify(in_o), {encoding:'utf-8'});
    myLogger.error('in_o.json write done')

    throw error;
  }
}

const file_raw = fs.readFileSync('./in_o.json',{encoding: 'utf8'})
const file_json = JSON.parse(file_raw);

inputCheck(file_json);

console.log('pass')