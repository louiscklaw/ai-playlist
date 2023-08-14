const S_HELLOWORLD = 'helloworld';

const S_NEW_JOB_FOUND = 'S_NEW_JOB_FOUND';
const S_EXTRACTING_JOB_DETAIL = 'S_EXTRACTING_JOB_DETAIL';
const S_EXTRACTION_DONE = 'S_EXTRACTION_DONE';
const S_SUMMARIZING_JOB_DETAIL = 'S_SUMMARIZING_JOB_DETAIL';
const S_SUMMARIZE_DONE = 'S_SUMMARIZE_DONE';
const S_DRAFTING_EMAIL = 'S_DRAFTING_EMAIL';
const S_DRAFT_EMAIL_DONE = 'S_DRAFT_EMAIL_DONE';
const S_ASKING_POE = 'S_ASKING_POE';
const S_ASKING_POE_DONE = 'S_ASKING_POE_DONE';
const S_STORE_JSON_DONE = 'S_STORE_JSON_DONE';
const S_READY_DRAFT_EMAIL = 'S_READY_DRAFT_EMAIL';
const S_READY_SUMMARIZE = 'S_READY_SUMMARIZE';

const transitions = [
  { name: 'extractJobDetail', from: S_NEW_JOB_FOUND, to: S_EXTRACTING_JOB_DETAIL },
  { name: 'extractDone', from: S_EXTRACTING_JOB_DETAIL, to: S_EXTRACTION_DONE },

  { name: 'askPoe', from: S_EXTRACTION_DONE, to: S_ASKING_POE },
  { name: 'askPoeDone', from: S_ASKING_POE, to: S_ASKING_POE_DONE },

  { name: 'summarize', from: S_READY_SUMMARIZE, to: S_SUMMARIZING_JOB_DETAIL },
  { name: 'summarizeDone', from: S_SUMMARIZING_JOB_DETAIL, to: S_SUMMARIZE_DONE },

  { name: 'poeDraftEmail', from: S_READY_DRAFT_EMAIL, to: S_DRAFTING_EMAIL },
  { name: 'poeDraftEmailDone', from: S_DRAFTING_EMAIL, to: S_DRAFT_EMAIL_DONE },

  { name: 'storeResult', from: S_DRAFT_EMAIL_DONE, to: S_STORE_JSON_DONE },
];

const { onPoeDraftEmail, onPoeDraftEmailDone } = require('./onPoeDraftEmail');
const { onSummarize, onSummarizeDone } = require('./onSummarize');
const { onAskPoe, onAskPoeDone } = require('./onAskPoe');
const { onExtractDone } = require('./onExtractDone');
const { onExtractJobDetail } = require('./onExtractJobDetail');
const { onStoreResult } = require('./onStoreResult');

const methods = {
  onExtractJobDetail,
  onExtractDone,
  onAskPoe,
  onAskPoeDone,
  onSummarize,
  onSummarizeDone,
  onPoeDraftEmail,
  onPoeDraftEmailDone,
  onStoreResult,
};

module.exports = {
  transitions,
  methods,
  S_HELLOWORLD,
  S_NEW_JOB_FOUND,
  S_EXTRACTING_JOB_DETAIL,
  S_EXTRACTION_DONE,
  S_SUMMARIZING_JOB_DETAIL,
  S_SUMMARIZE_DONE,
  S_DRAFTING_EMAIL,
  S_DRAFT_EMAIL_DONE,
  S_ASKING_POE,
  S_ASKING_POE_DONE,
  S_READY_DRAFT_EMAIL,
};
