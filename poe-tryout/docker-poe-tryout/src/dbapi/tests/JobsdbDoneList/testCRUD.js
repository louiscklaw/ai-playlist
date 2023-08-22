const { myLogger } = require('../../utils/myLogger');
// const { delJobsdbDoneList } = require('./delJobsdbDoneList');
const { getJobsdbDoneListByLink } = require('./getJobsdbDoneList');
const { getJobsdbDoneListCount } = require('./getJobsdbDoneListCount');
const { listJobsdbDoneList } = require('./listJobsdbDoneList');
const { newJobsdbDoneList } = require('./newJobsdbDoneList');
// const { updateJobsdbDoneList } = require('./updateJobsdbDoneList');

(async () => {
  var current_jobdb_done_list = await listJobsdbDoneList();
  var jobsdb_done_list_count = await getJobsdbDoneListCount();
  myLogger.info('current_jobdb_done_list should be empty');
  // console.log(current_jobdb_done_list);
  // myLogger.info(current_customers);
  myLogger.info('%o', jobsdb_done_list_count);

  var new_customer = await newJobsdbDoneList({ link: 'new-customer' });
  console.log(new_customer);
  current_jobdb_done_list = await listJobsdbDoneList();
  myLogger.info('current_jobdb_done_list have 1');
  jobsdb_done_list_count = await getJobsdbDoneListCount();
  // myLogger.info('%o', jobsdb_done_list_count);

  // await updateJobsdbDoneList(new_customer._id, { name: 'new-customer', comment: 'new customer comment' });
  // myLogger.info('current_customers have 1');
  // myLogger.info(current_customers);
  // myLogger.info(customer_count);

  var match_list = await getJobsdbDoneListByLink('new-11111');
  myLogger.info('current match_list');
  myLogger.info("%o",match_list);

  // await delJobsdbDoneList(new_customer._id);
  // current_customers = await listJobsdbDoneList();
  // myLogger.info('current_customers have 0');
  // myLogger.info(current_customers);
  // myLogger.info(customer_count);

  // current_customers = await listJobsdbDoneList();
})();

myLogger.info('helloworld');
