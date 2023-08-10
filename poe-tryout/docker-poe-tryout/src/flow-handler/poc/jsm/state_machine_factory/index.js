var StateMachine = require('javascript-state-machine');

const S_NEW_JOB_FOUND = 's_new_job_found';
const S_EXTRACTING_JOB_DETAIL = 's_extracting_job_detail';
const S_EXTRACTION_DONE = 's_extraction_done';
const S_SUMMARIZING_JOB_DETAIL = 's_summarizing_job_detail';
const S_SUMMARIZE_DONE = 's_summarize_done';
const S_DRAFTING_EMAIL = 's_drafting_email';
const S_DRAFT_EMAIL_DONE = 's_draft_email_done';

var component = {};

var Matter = new StateMachine.factory({
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
      this.context = {color: 'blue'}
      console.log('I extractJobDetail');
    },
    onExtractDone: function () {
      console.log('I extractDone');
    },
    onSummarize: function () {
      console.log('I Summarize');
    },
    onSummarizeDone: function () {
      console.log('I SummarizeDone');
    },
    onDraftEmail: function () {
      console.log('I DraftEmail');
    },
    onDraftDone: function () {
      console.log('I DraftDone');
    },
  },
  data: context => ({ context: context }),
});

var a = new Matter({ color: 'red' });

console.log(a.state);
a.extractJobDetail();
console.log(a.state);

a.extractDone();
console.log(a.state);

a.summarize();
console.log(a.state);

a.summarizeDone();
console.log(a.state);

a.draftEmail();
console.log(a.state);

a.draftDone();
console.log(a.state);
console.log(a.context);
