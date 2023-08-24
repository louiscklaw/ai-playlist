const rp = require('request-promise');

const express = require('express');
const { myLogger } = require('../../../utils/myLogger');
const { mutex } = require('../../Customer/mutex');
const { VisitedLinkModel, POE_SEAT_ONLINE } = require('../../../models/VisitedLink');
const router = express.Router();

// const { mutex } = require('../../mutex');

router.post('/', async (req, res) => {
  var output = {
    state: 'INIT1',
    debug: { req_body: req.body },
    error: '',
  };
  const { link } = req.body;

  //   var result = {};

  await mutex.acquire();

  try {
    myLogger.info(JSON.stringify(output));
    let record = await VisitedLinkModel.findOne({  link });

    if (!record) {
      // If no existing record found, create a new one
      record = new VisitedLinkModel({ link });
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
