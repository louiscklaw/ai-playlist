const extractJobsDBPostIdFromUrl = url_in => {
  const last_ele = url_in.length - 1;
  return url_in.split('-').pop();
};

module.exports = { extractJobsDBPostIdFromUrl };
