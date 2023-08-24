const rp = require('request-promise');

const express = require('express');
const { myLogger } = require('../../../utils/myLogger');
const { mutex } = require('../../Customer/mutex');
const { PoeSeatStatusModel, POE_SEAT_NOT_OFFLINE, POE_SEAT_OFFLINE } = require('../../../models/PoeSeatStatus');
const router = express.Router();

// const { mutex } = require('../../mutex');

router.get('/:poe_host_name', async (req, res) => {
  var output = {
    state: 'INIT',
    debug: { req_params: req.params },
    error: '',
  };
  const { poe_host_name } = req.params;

  await mutex.acquire();

  try {
    let record = await PoeSeatStatusModel.findOne({ name: poe_host_name });

    if (!record) {
      // If no existing record found, create a new one
      record = new PoeSeatStatusModel({ name: poe_host_name, status: POE_SEAT_OFFLINE });
      await record.save();

      output = { ...output, state: 'CREATED' };
    }

    output = { ...output, state: 'DONE', record };
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'ERROR', error: JSON.stringify(error) };
    myLogger.error(JSON.stringify(output));
  }

  mutex.release();

  //   res.send(result);
  res.send(output);
});

module.exports = router;
