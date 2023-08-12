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
  S_SUMMARIZE_DONE,
  S_DRAFT_EMAIL_DONE,
} = require('./transitions');

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

var jobsdbPoeSummarizeCbMachine = new StateMachine.factory({
  init: S_SUMMARIZE_DONE,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsdbPoeDraftEmailCbMachine = new StateMachine.factory({
  init: S_DRAFT_EMAIL_DONE,
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
  jobsdbPoeSummarizeCbMachine,
  jobsdbPoeDraftEmailCbMachine,
  helloworld,
};
