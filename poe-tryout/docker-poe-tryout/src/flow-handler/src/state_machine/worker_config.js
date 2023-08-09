'use string';

const Finity = require('finity');

const { mySleep } = require('../utils/mySleep');

const S_NEW_JOB_FOUND = 's_new_job_found';
const S_EXTRACTING_JOB_DETAIL = 's_extracting_job_detail';
const S_EXTRACTION_DONE = 's_extraction_done';
const S_SUMMARIZING_JOB_DETAIL = 's_summarizing_job_detail';
const S_SUMMARIZE_DONE = 's_summarize_done';
const S_DRAFTING_EMAIL = 's_drafting_email';
const S_DRAFT_EMAIL_DONE = 's_draft_email_done';

const E_DRAFT_EMAIL_DONE = 'e_draft_email_done';
const E_DRAFT_EMAIL = 'e_draft_email';
const E_EXTRACT_JOB_DETAIL = 'e_extract_job_detail';
const E_EXTRACTION_DONE = 'e_extraction_done';
const E_SUMMARIZE_DONE = 'e_summarize_done';
const E_SUMMARIZE_JOB_DETAIL = 'e_summarize_job_detail';

function processTaskAsync(taskParams) {
  console.log('Processing task:', taskParams);
  const { foo } = taskParams;
  // Simulate an async operation
  return new Promise(resolve => setTimeout(resolve, foo * 1000));
}

const worker_config = Finity
  .configure()
    .initialState('ready')
      .on('task_submitted').transitionTo('running')
    .state('running')
      .do((state, context) => processTaskAsync(context.eventPayload))
        .onSuccess().transitionTo('succeeded')
        .onFailure().transitionTo('failed')
      .onTimeout(1000)
        .transitionTo('timed_out')
    .global()
      .onStateEnter(state => console.log(`Entering state '${state}'`))
  .getConfig();

module.exports = {
  worker_config,
};
