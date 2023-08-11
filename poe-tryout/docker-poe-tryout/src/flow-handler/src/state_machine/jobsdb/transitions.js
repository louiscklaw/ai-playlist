
const { poeSchedulerHellworld, poeProcessNewJobPost } = require('../../utils/fetchOpenboxSeat');
const { getHelloworld } = require('../../fetch/getHelloworld');
const { postHelloworld } = require('../../fetch/postHelloworld');

const S_HELLOWORLD = 'helloworld';

const S_NEW_JOB_FOUND = 's_new_job_found';
const S_EXTRACTING_JOB_DETAIL = 's_extracting_job_detail';
const S_EXTRACTION_DONE = 's_extraction_done';
const S_SUMMARIZING_JOB_DETAIL = 's_summarizing_job_detail';
const S_SUMMARIZE_DONE = 's_summarize_done';
const S_DRAFTING_EMAIL = 's_drafting_email';
const S_DRAFT_EMAIL_DONE = 's_draft_email_done';
const S_ASKING_POE = 's_asking_poe';
const S_ASKING_POE_DONE = 's_asking_poe_done';

const EXTRACTION_SUCCESS = 'extract success';

const transitions = [
  { name: 'extractJobDetail', from: S_NEW_JOB_FOUND, to: S_EXTRACTING_JOB_DETAIL },
  { name: 'extractDone', from: S_EXTRACTING_JOB_DETAIL, to: S_EXTRACTION_DONE },
  { name: 'askPoe', from: S_EXTRACTION_DONE, to: S_ASKING_POE },
  { name: 'askPoeDone', from: S_ASKING_POE, to: S_ASKING_POE_DONE },
  { name: 'summarize', from: S_ASKING_POE_DONE, to: S_SUMMARIZING_JOB_DETAIL },
  { name: 'summarizeDone', from: S_SUMMARIZING_JOB_DETAIL, to: S_SUMMARIZE_DONE },
  { name: 'poeDraftEmail', from: S_SUMMARIZE_DONE, to: S_DRAFTING_EMAIL },
  { name: 'poeDraftEmailDone', from: S_DRAFTING_EMAIL, to: S_DRAFT_EMAIL_DONE },
];

const methods = {
  onExtractJobDetail: function () {
    return new Promise(async (res, rej) => {
      retry_count = 3;
      for (var i = 0; i < retry_count; i++) {
        try {
          var { post_id, jobsdb_job_url } = this.context;
          this.context.post_id = post_id;

          // post_id,
          var result = await postJobsdbPostExtract({
            post_id,
            url: jobsdb_job_url,
          });
          var result_json = await result.json();

          this.context['extraction_result'] = result_json;

          res();
        } catch (error) {
          console.log(error);
          console.log('error found, retry');
        }
      }
      rej('extract job detail failed, url:' + this.context.jobsdb_job_url);
    });
  },
  onExtractDone: function () {
    return new Promise(async (res, rej) => {
      const { extraction_result } = this.context;
      const { state } = extraction_result;
      if (state != EXTRACTION_SUCCESS) {
        rej('extraction failed');
      }
      res();
    });
  },
  onAskPoe: function () {
    return new Promise(async (res, rej) => {
      // poe-scheduler-api
      const result = await poeProcessNewJobPost({
        jobs_id: 'blablabla',
        question_list: ["say 'hello 1' to me", "say 'hello 2' to me", "say 'hello 3' to me"],
        callback_url: 'http://flow-handler:3000/jobsdb_flow_poe_callback',
      });
      const res_json = await result.json();
      console.log({ res_json });

      console.log('asking poe, ');
      // console.log({ context });
      res();
    });
  },
  onAskPoeDone: function () {
    return new Promise(async (res, rej) => {
      console.log('ask poe done, post_id:' + this.context.post_id);
      res();
    });
  },
  onSummarize: function () {
    return new Promise(async (res, rej) => {
      console.log('I Summarize');
      res();
    });
  },
  onSummarizeDone: function () {
    return new Promise(async (res, rej) => {
      console.log('I SummarizeDone');
      res();
    });
  },
  onPoeDraftEmail: function () {
    return new Promise(async (res, rej) => {
      console.log('I DraftEmail');
      var result= await postHelloworld({job_info:"helloworld"})
      var res_json = result.json();
      
      res();
    });
  },
  onPoeDraftEmailDone: function () {
    return new Promise(async (res, rej) => {
      console.log('I DraftEmailDone');
      // var result = await getHelloworld();
      // var res_text = await result.text();
      // console.log(res_text);
      res();
    });
  },
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
};