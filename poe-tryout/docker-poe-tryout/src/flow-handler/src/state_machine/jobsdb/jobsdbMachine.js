// const { mySleep } = require('../../utils/mySleep');
const { fetchPost, postJobsdbPostExtract } = require('../../utils/fetchPost');

// const fetch = require('node-fetch');

var StateMachine = require('javascript-state-machine');
const { poeSchedulerHellworld, poeProcessNewJobPost } = require('../../utils/fetchOpenboxSeat');

const { transitions, methods, S_EXTRACTION_DONE, S_ASKING_POE_DONE } = require('./transitions');

var jobsdbMachine = new StateMachine.factory({
  init: S_EXTRACTION_DONE,
  // S_NEW_JOB_FOUND,
  transitions,
  methods,
  data: context => ({ context: context }),
});

var jobsdbPoeCallack = new StateMachine.factory({
  init: S_ASKING_POE_DONE,
  // S_NEW_JOB_FOUND,
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
  helloworld,
};
