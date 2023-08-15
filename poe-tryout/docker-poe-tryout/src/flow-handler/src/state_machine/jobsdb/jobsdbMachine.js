// const { mySleep } = require('../../utils/mySleep');
// const { fetchPost, postJobsdbPostExtract } = require('../../utils/fetchPost');

// const fetch = require('node-fetch');
// const { poeSchedulerHellworld, poeProcessNewJobPost } = require('../../utils/fetchOpenboxSeat');

var StateMachine = require('javascript-state-machine');

const {
  //
  transitions,
  methods,
  S_EXTRACTION_DONE,
  S_ASKING_POE_DONE,
  S_DRAFTING_EMAIL,
  S_READY_DRAFT_EMAIL,
  S_READY_SUMMARIZE,
  S_SUMMARIZING_JOB_DETAIL,
  S_NEW_JOB_FOUND,
  S_EXTRACTING_JOB_DETAIL,
} = require('./transitions');

var jobsFoundMachine = new StateMachine.factory({
  init: S_NEW_JOB_FOUND,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsFoundCbMachine = new StateMachine.factory({
  init: S_EXTRACTING_JOB_DETAIL,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsdbMachine = new StateMachine.factory({
  init: S_EXTRACTION_DONE,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsdbPoeCallack = new StateMachine.factory({
  init: S_ASKING_POE_DONE,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsdbPoeSummarizeMachine = new StateMachine.factory({
  init: S_READY_SUMMARIZE,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsdbPoeSummarizeCbMachine = new StateMachine.factory({
  init: S_SUMMARIZING_JOB_DETAIL,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsdbPoeDraftEmailMachine = new StateMachine.factory({
  init: S_READY_DRAFT_EMAIL,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsdbPoeDraftEmailCbMachine = new StateMachine.factory({
  init: S_DRAFTING_EMAIL,
  transitions,
  methods,
  data: context => ({ context: context }),
});

function helloworld() {
  console.log('jobsdb_flow.js');
  return 'helloworld';
}

module.exports = {
  jobsdbMachine,
  jobsdbPoeCallack,
  jobsdbPoeSummarizeMachine,
  jobsdbPoeSummarizeCbMachine,
  jobsdbPoeDraftEmailMachine,
  jobsdbPoeDraftEmailCbMachine,
  jobsFoundMachine,
  jobsFoundCbMachine,
  helloworld,
};
