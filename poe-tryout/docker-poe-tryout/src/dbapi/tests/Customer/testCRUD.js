const { delCustomer } = require('./delCustomer');
const { getCustomerById } = require('./getCustomer');
const { getCustomerCount } = require('./getCustomerCount');
const { listCustomer } = require('./listCustomer');
const { newCustomer } = require('./newCustomer');
const { updateCustomer } = require('./updateCustomer');

(async () => {
  var current_customers = await listCustomer();
  var customer_count = await getCustomerCount();
  console.log('current_customers should be empty');
  console.log(current_customers);
  console.log(customer_count);

  var new_customer = await newCustomer({ name: 'new-customer', comment: 'no comment' });
  current_customers = await listCustomer();
  console.log('current_customers have 1');
  console.log(current_customers);
  console.log(customer_count);

  await updateCustomer(new_customer._id, { name: 'new-customer', comment: 'new customer comment' });
  console.log('current_customers have 1');
  console.log(current_customers);
  console.log(customer_count);

  var customer = await getCustomerById(new_customer._id);
  console.log('current customer');
  console.log(customer);

  await delCustomer(new_customer._id);
  current_customers = await listCustomer();
  console.log('current_customers have 0');
  console.log(current_customers);
  console.log(customer_count);

  // current_customers = await listCustomer();
})();

console.log('helloworld');
