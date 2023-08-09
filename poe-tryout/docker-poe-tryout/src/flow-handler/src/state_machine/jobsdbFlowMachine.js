'use string';

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

const Finity = require('finity');

const enterStateHandler = state => {
  switch (state) {
    case S_NEW_JOB_FOUND:
      console.log('a new job found');
      break;
    case S_EXTRACTING_JOB_DETAIL:
      console.log('S_EXTRACTING_JOB_DETAIL');
      break;
    case S_EXTRACTION_DONE:
      console.log('S_EXTRACTION_DONE');
      break;
    case S_SUMMARIZING_JOB_DETAIL:
      console.log('S_SUMMARIZING_JOB_DETAIL');
      break;
    case S_SUMMARIZE_DONE:
      console.log('S_SUMMARIZE_DONE');
      break;
    case S_DRAFTING_EMAIL:
      console.log('S_DRAFTING_EMAIL');
      break;
    case S_DRAFT_EMAIL_DONE:
      console.log('S_DRAFT_EMAIL_DONE');
      break;

    default:
      break;
  }
};

// prettier-ignore
const jobsdbFlowMachine = Finity
  .configure()
    .initialState(S_NEW_JOB_FOUND)
      .on(E_EXTRACT_JOB_DETAIL)
        .transitionTo(S_EXTRACTING_JOB_DETAIL)
    .state(S_EXTRACTING_JOB_DETAIL)
      .on(E_EXTRACTION_DONE)
        .transitionTo(S_EXTRACTION_DONE)
    .state(S_EXTRACTION_DONE)
      .on(E_SUMMARIZE_JOB_DETAIL)
        .transitionTo(S_SUMMARIZING_JOB_DETAIL)
    .state(S_SUMMARIZING_JOB_DETAIL)
      .on(E_SUMMARIZE_DONE)
        .transitionTo(S_SUMMARIZE_DONE)
    .state(S_SUMMARIZE_DONE)
      .on(E_DRAFT_EMAIL)
        .transitionTo(S_DRAFTING_EMAIL)
    .state(S_DRAFTING_EMAIL)
      .on(E_DRAFT_EMAIL_DONE)
        .transitionTo(S_DRAFT_EMAIL_DONE)
    .global()
      .onStateEnter(state => enterStateHandler(state))
      // .onStateExit(state => console.log(`- Exiting state '${state}'`))
  .start();

module.exports = { jobsdbFlowMachine };

const test = () => {
  stateMachine.handle('e_extract_job_detail');
  stateMachine.handle('e_extraction_done');
  stateMachine.handle('e_summarize_job_detail');
  stateMachine.handle('e_summarize_done');
  stateMachine.handle('e_draft_email');
  stateMachine.handle('e_draft_email_done');
};
