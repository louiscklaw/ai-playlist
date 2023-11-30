const rp = require('request-promise');

const express = require('express');
const { myLogger } = require('../../../utils/myLogger');
const { mutex } = require('../../Customer/mutex');
const { PoeSeatStatusModel, POE_SEAT_ONLINE } = require('../../../models/PoeSeatStatus');
const router = express.Router();

// const { mutex } = require('../../mutex');

router.patch('/:poe_host_name', async (req, res) => {
  var output = {
    state: 'INIT',
    debug: { req_params: req.params },
    error: '',
  };
  const { poe_host_name } = req.params;

  //   var result = {};

  await mutex.acquire();

  try {
    myLogger.info(JSON.stringify(output));
    let record = await PoeSeatStatusModel.findOne({ name: poe_host_name });

    if (!record) {
      // If no existing record found, create a new one
      record = new PoeSeatStatusModel({ name: poe_host_name });
      output = { ...output, state: 'CREATED' };
    }

    record.status = POE_SEAT_ONLINE;

    output = { ...output, state: 'DONE', record };
    await record.save();
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'ERROR', error: JSON.stringify(error) };
    myLogger.error(JSON.stringify(output));
  } finally {
    mutex.release();

    //   res.send(result);
    res.send(output);
  }
});

module.exports = router;
