var validUrl = require('valid-url');

const { postJobsdbPostExtract } = require('../../utils/fetchPost');
const { myLogger } = require('../../utils/myLogger');

module.exports = {
  onExtractJobDetail: function () {
    return new Promise(async (res, rej) => {
      try {
        retry_count = 5;

        // myLogger.info("%o",this.context);

        var { req_body } = this.context;
        var { jobsdb_job_url, callback_url } = req_body;

        if (validUrl.isUri(jobsdb_job_url)) {
          // NOTE: url checking pass
        } else {
          throw new Error(`invalid url ${jobsdb_job_url}`);
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
        myLogger.error('%o', error);
        rej('extract job detail failed, url:' + jobsdb_job_url);
      }
    });
  },
};
