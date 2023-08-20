const { myLogger } = require('../../utils/myLogger');
const { delCustomer } = require('./delCustomer');
const { getCustomerById } = require('./getCustomer');
const { getCustomerCount } = require('./getCustomerCount');
const { listCustomer } = require('./listCustomer');
const { newCustomer } = require('./newCustomer');
const { updateCustomer } = require('./updateCustomer');

(async () => {
  var current_customers = await listCustomer();
  var customer_count = await getCustomerCount();
  myLogger.info('current_customers should be empty');
  myLogger.info(current_customers);
  myLogger.info(customer_count);

  var new_customer = await newCustomer({ name: 'new-customer', comment: 'no comment' });
  current_customers = await listCustomer();
  myLogger.info('current_customers have 1');
  myLogger.info(current_customers);
  myLogger.info(customer_count);

  await updateCustomer(new_customer._id, { name: 'new-customer', comment: 'new customer comment' });
  myLogger.info('current_customers have 1');
  myLogger.info(current_customers);
  myLogger.info(customer_count);

  var customer = await getCustomerById(new_customer._id);
  myLogger.info('current customer');
  myLogger.info(customer);

  await delCustomer(new_customer._id);
  current_customers = await listCustomer();
  myLogger.info('current_customers have 0');
  myLogger.info(current_customers);
  myLogger.info(customer_count);

  // current_customers = await listCustomer();
})();

myLogger.info('helloworld');
