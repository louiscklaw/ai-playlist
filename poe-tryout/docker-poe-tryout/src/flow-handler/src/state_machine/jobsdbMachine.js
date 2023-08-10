const { mySleep } = require('../utils/mySleep');
const fetch = require('node-fetch');

var StateMachine = require('javascript-state-machine');

const S_NEW_JOB_FOUND = 's_new_job_found';
const S_EXTRACTING_JOB_DETAIL = 's_extracting_job_detail';
const S_EXTRACTION_DONE = 's_extraction_done';
const S_SUMMARIZING_JOB_DETAIL = 's_summarizing_job_detail';
const S_SUMMARIZE_DONE = 's_summarize_done';
const S_DRAFTING_EMAIL = 's_drafting_email';
const S_DRAFT_EMAIL_DONE = 's_draft_email_done';

const extractJobsDBPostIdFromUrl = (url_in) => {
  const last_ele = url_in.length-1
  return url_in.split('-')[last_ele]
};

var jobsdbMachine = new StateMachine.factory({
  init: S_NEW_JOB_FOUND,
  transitions: [
    { name: 'extractJobDetail', from: S_NEW_JOB_FOUND, to: S_EXTRACTING_JOB_DETAIL },
    { name: 'extractDone', from: S_EXTRACTING_JOB_DETAIL, to: S_EXTRACTION_DONE },
    { name: 'summarize', from: S_EXTRACTION_DONE, to: S_SUMMARIZING_JOB_DETAIL },
    { name: 'summarizeDone', from: S_SUMMARIZING_JOB_DETAIL, to: S_SUMMARIZE_DONE },
    { name: 'draftEmail', from: S_SUMMARIZE_DONE, to: S_DRAFTING_EMAIL },
    { name: 'draftDone', from: S_DRAFTING_EMAIL, to: S_DRAFT_EMAIL_DONE },
  ],
  methods: {
    onExtractJobDetail: function () {
      return new Promise(async (res, rej) => {
        retry_count = 3;
        for (var i = 0; i < retry_count; i++) {
          try {
            var { jobsdb_job_url}= this.context;
            var result = await fetch(`http://jobsdb-link-extractor:3000/jobsdbPostExtract`,{
              method:'POST',
              body: JSON.stringify({
                url: jobsdb_job_url
              }),
              headers: { 'Content-Type': 'application/json' }
            });
            var result_json = await result.json();
            this.context.job_id = extractJobsDBPostIdFromUrl(jobsdb_job_url); 
            res(result_json);
          } catch (error) {
            console.log(error);
            console.log('error found, retry');
          }
        }
        rej('extract job detail failed');
      });
    },

    onExtractDone: function () {
      return new Promise(async (res, rej) => {
        console.log('extraction done, job_id:'+ this.context.job_id)
        res()
      });
    },
    // onSummarize: function () {
    //   console.log('I Summarize');
    // },
    // onSummarizeDone: function () {
    //   console.log('I SummarizeDone');
    // },
    // onDraftEmail: function () {
    //   console.log('I DraftEmail');
    // },
    // onDraftDone: function () {
    //   console.log('I DraftDone');
    // },
  },
  data: context => ({ context: context }),
});

function helloworld() {
  console.log('jobsdb_flow.js');
  return 'helloworld';
}

module.exports = {
  jobsdbMachine,
  helloworld,
};
