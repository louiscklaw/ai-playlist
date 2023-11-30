var validUrl = require('valid-url');

const { postJobsdbPostExtract } = require('../../../utils/fetchPost');
const { myLogger } = require('../../../utils/myLogger');

const NO_NEED_SCAN_URL = 'NO_NEED_SCAN_URL';
const INVALID_URL = 'INVALID_URL';
const NO_NEED_EXTRACT_LIST = [
  'https://hk.jobsdb.com/hk/en/Error/PageNotFound'
]

module.exports = {
  onExtractJobDetail: function () {
    return new Promise(async (res, rej) => {
      try {
        retry_count = 5;

        // myLogger.info("%o",this.context);

        var { req_body } = this.context;
        var { jobsdb_job_url, callback_url } = req_body;

        // TODO: use joi here,
        if (validUrl.isUri(jobsdb_job_url)) {
          // NOTE: url checking pass
        } else {
          throw new Error(`invalid url ${jobsdb_job_url}`);
        }

        if (NO_NEED_EXTRACT_LIST.indexOf(jobsdb_job_url) > -1) {
          // jobsdb_job_url in no need extract list, skipping
          throw new Error(NO_NEED_SCAN_URL);
        }

        // NOTE: receiver -> src/jobsdb-link-extractor/src/routes/jobsdbPostExtract.js
        var result = await postJobsdbPostExtract({
          url: jobsdb_job_url,
          jobsdb_job_url,
          callback_url,
        });
        var result_json = await result.json();
        myLogger.info('%o', { result_json });

        res();
      } catch (error) {
        if (error.message == NO_NEED_SCAN_URL) {
          rej('no need scan url:' + jobsdb_job_url);
        }

        if (error.message == INVALID_URL) {
          rej('invalid url:' + jobsdb_job_url);
        }

        myLogger.error(JSON.stringify(error));
        rej('extract job detail failed, url:' + jobsdb_job_url);
      }
    });
  },
};
