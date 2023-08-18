const { delCustomer } = require('./delCustomer');
const { getCustomerById } = require('./getCustomer');
const { getCustomerCount } = require('./getCustomerCount');
const { listCustomer } = require('./listCustomer');
const { newCustomer } = require('./newCustomer');
const { queryCustomer } = require('./queryCustomer');

(async () => {
  // var new_customer = await newCustomer({ name: 'new-customer', comment: 'no comment' });
  // current_customers = await listCustomer();
  // console.log('current_customers have 1');
  // console.log(current_customers);

  var res_json = await queryCustomer();
  console.log(res_json);
})();
