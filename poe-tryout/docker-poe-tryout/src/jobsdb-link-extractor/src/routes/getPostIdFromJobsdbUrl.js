function getPostIdFromJobsdbUrl(jobsdb_job_url) {
  return jobsdb_job_url.replace('.html', '').split('-').pop();
}

module.exports = { getPostIdFromJobsdbUrl };
