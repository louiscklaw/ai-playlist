const { postJobsdbPostExtract } = require('../../utils/fetchPost');

module.exports = {
  onExtractJobDetail: function () {
    return new Promise(async (res, rej) => {
      try {
        retry_count = 5;

        console.log(this.context);
        var { req_body } = this.context;
        var { jobsdb_job_url, callback_url } = req_body;


        var result = await postJobsdbPostExtract({
          url: jobsdb_job_url,
          callback_url
        });
        var result_json = await result.json();
        console.log(result_json )

        res();
      } catch (error) {
        console.log(error);
        rej('extract job detail failed, url:' + jobsdb_job_url);
      }
    });
  },
};
