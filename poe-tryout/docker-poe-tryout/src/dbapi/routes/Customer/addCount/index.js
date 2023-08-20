const rp = require('request-promise');

const express = require('express');
const router = express.Router();

const { mutex } = require('../mutex');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  var result = {};

  await mutex.acquire();
  try {
    // myLogger.info(`lock key_${id}`)

    const customer = await rp({ uri: `http://dbapi:3001/api/v1/Customer/${id}`, json: true });
    // myLogger.info(customer);

    const updated_customer = { ...customer, count: customer.count + 1 };

    var options = {
      method: 'PATCH',
      uri: `http://dbapi:3001/api/v1/Customer/${id}`,
      body: updated_customer,
      json: true,
    };

    result = await rp(options);
  } catch (error) {
  } finally {
    mutex.release();
  }

  res.send(result);
});

module.exports = router;
