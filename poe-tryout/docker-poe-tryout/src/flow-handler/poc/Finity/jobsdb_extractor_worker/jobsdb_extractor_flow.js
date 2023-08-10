'use strict';

const Finity = require('finity');

const {
  S_NEW_JOB_FOUND,
  S_EXTRACTING_JOB_DETAIL,
  S_EXTRACTION_DONE,
  S_SUMMARIZING_JOB_DETAIL,
  S_SUMMARIZE_DONE,
  S_DRAFTING_EMAIL,
  S_DRAFT_EMAIL_DONE,
  S_ALERT_USER,

  E_DRAFT_EMAIL_DONE,
  E_DRAFT_EMAIL,
  E_EXTRACT_JOB_DETAIL,
  E_EXTRACTION_DONE,
  E_SUMMARIZE_DONE,
  E_SUMMARIZE_JOB_DETAIL,
} = require('./states');

function processTaskAsync(taskParams) {
  console.log('Processing task:', taskParams);
  var {delay, retry} = taskParams;
  // Simulate an async operation
  return new Promise(resolve => {
    setTimeout(resolve, 50000)
  });
}


const jobsdb_extractor_flow = Finity
  .configure()
    .initialState(S_NEW_JOB_FOUND)
      .on(E_EXTRACT_JOB_DETAIL).transitionTo(S_EXTRACTING_JOB_DETAIL)
    .state(S_EXTRACTING_JOB_DETAIL)
      // extraction process ?
      .do((state, context) => processTaskAsync(context.eventPayload))
        .onSuccess().transitionTo(S_EXTRACTION_DONE)
        .onFailure().transitionTo(S_EXTRACTING_JOB_DETAIL)
        .onTimeout(1 * 1000).transitionTo(S_EXTRACTING_JOB_DETAIL)
    // .state(S_EXTRACTION_DONE)
    //   .do((state, context) => {
    //     // summarize process ?
    //     return processTaskAsync(context.result)
    //   })
    //     .onSuccess().transitionTo(S_SUMMARIZE_DONE)
    //     .onFailure().transitionTo('succeeded1')
    //     .onTimeout(1000).transitionTo('timed_out')
    // .state(S_SUMMARIZE_DONE)
    //   .do((state, context) => {
    //     // draft email process ?
    //     return processTaskAsync(context.result)
    //   })
    //     .onSuccess().transitionTo(S_DRAFT_EMAIL_DONE)
    // .state(S_ALERT_USER)
    //   .do((state, context) => {
    //     // draft email process ?
    //     return processTaskAsync(context.result)
    //   })
    //     .onSuccess().transitionTo(S_DRAFT_EMAIL_DONE)
  
    .state('all_done')
    .global()
      .onStateEnter((state, context) => {
        console.log(`Entering state '${state}'`)
      })
    .getConfig();

// const taskParams = {
//   foo: 'bar',
// };
// worker.handle('task_submitted', taskParams);

module.exports = {
  jobsdb_extractor_flow
}