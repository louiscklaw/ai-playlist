const { myLogger } = require('../../utils/myLogger');
const { delCustomer } = require('./delCustomer');
const { getCustomerById } = require('./getCustomer');
const { getCustomerCount } = require('./getCustomerCount');
const { listCustomer } = require('./listCustomer');
const { newCustomer } = require('./newCustomer');
const { queryCustomer } = require('./queryCustomer');

(async () => {
  // var new_customer = await newCustomer({ name: 'new-customer', comment: 'no comment' });
  // current_customers = await listCustomer();
  // myLogger.info('current_customers have 1');
  // myLogger.info(current_customers);

  var res_json = await queryCustomer();
  myLogger.info(res_json);
})();
