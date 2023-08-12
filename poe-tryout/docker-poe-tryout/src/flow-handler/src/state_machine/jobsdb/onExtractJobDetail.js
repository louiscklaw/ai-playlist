module.exports = {
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
};
