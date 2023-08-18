const rp = require('request-promise');

const express = require('express');
const router = express.Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  const customer = await rp({ uri: `http://dbapi:3001/api/v1/Customer/${id}`, json: true });
  console.log(customer);

  const updated_customer = { ...customer, count: customer.count + 1 };

  var options = {
    method: 'PATCH',
    uri: `http://dbapi:3001/api/v1/Customer/${id}`,
    body: updated_customer,
    json: true,
  };

  var result = await rp(options);

  res.send(result);
});

module.exports = router;
