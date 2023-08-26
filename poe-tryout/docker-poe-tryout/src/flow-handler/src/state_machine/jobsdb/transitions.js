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

const S_JOB_COMPLETE = 'S_JOB_COMPLETE';

const transitions = [
  { name: 'extractJobDetail', from: S_NEW_JOB_FOUND, to: S_EXTRACTING_JOB_DETAIL },
  { name: 'extractDone', from: S_EXTRACTING_JOB_DETAIL, to: S_EXTRACTION_DONE },

  // NOTE: why i do this ??
  { name: 'askPoe', from: S_EXTRACTION_DONE, to: S_ASKING_POE },
  { name: 'askPoeDone', from: S_ASKING_POE, to: S_ASKING_POE_DONE },

  { name: 'poeSummarize', from: S_READY_SUMMARIZE, to: S_SUMMARIZING_JOB_DETAIL },
  { name: 'poeSummarizeDone', from: S_SUMMARIZING_JOB_DETAIL, to: S_READY_DRAFT_EMAIL },

  // draft CV
  { name: 'poeDraftEmail', from: S_READY_DRAFT_EMAIL, to: S_DRAFTING_EMAIL },
  { name: 'poeDraftEmailDone', from: S_DRAFTING_EMAIL, to: S_DRAFT_EMAIL_DONE },

  { name: 'storeResult', from: S_DRAFT_EMAIL_DONE, to: S_STORE_JSON_DONE },
  { name: 'reportJobComplete', from: S_STORE_JSON_DONE, to: S_JOB_COMPLETE },
];

const { onExtractJobDetail } = require('./onExtractJobDetail');
const { onExtractDone } = require('./onExtractDone');
const { onPoeSummarize, onPoeSummarizeDone } = require('./onPoeSummarize');
const { onPoeDraftEmail } = require('./onPoeDraftEmail');
const { onPoeDraftEmailDone } = require('./onPoeDraftEmailDone');
const { onStoreResult } = require('./onStoreResult');
const { onReportJobComplete } = require('./onReportJobComplete');

const { onAskPoe, onAskPoeDone } = require('./onAskPoe');

const methods = {
  onExtractJobDetail,
  onExtractDone,
  onAskPoe,
  onAskPoeDone,
  onPoeSummarize,
  onPoeSummarizeDone,
  onPoeDraftEmail,
  onPoeDraftEmailDone,
  onStoreResult,
  onReportJobComplete,
};

module.exports = {
  transitions,
  methods,
  S_ASKING_POE_DONE,
  S_ASKING_POE,
  S_DRAFT_EMAIL_DONE,
  S_DRAFTING_EMAIL,
  S_EXTRACTING_JOB_DETAIL,
  S_EXTRACTION_DONE,
  S_HELLOWORLD,
  S_NEW_JOB_FOUND,
  S_READY_DRAFT_EMAIL,
  S_READY_SUMMARIZE,
  S_SUMMARIZE_DONE,
  S_SUMMARIZING_JOB_DETAIL,
};
