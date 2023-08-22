const Joi = require('joi');

const helloworld_schema = Joi.object({
  url: Joi.string().uri().required(),
  jobsdb_job_url: Joi.string().uri().required(),
  callback_url: Joi.string().uri().required(),
});

module.exports = {helloworld_schema}
