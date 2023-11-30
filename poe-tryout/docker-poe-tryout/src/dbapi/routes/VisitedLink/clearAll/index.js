const rp = require('request-promise');

const express = require('express');
const { myLogger } = require('../../../utils/myLogger');
const { mutex } = require('../../Customer/mutex');
const { VisitedLinkModel } = require('../../../models/VisitedLink');
const router = express.Router();

// const { mutex } = require('../../mutex');

router.get('/', async (req, res) => {
  var output = {
    state: 'INIT',
    error: '',
  };

  await mutex.acquire();

  try {
    await VisitedLinkModel.deleteMany({});

    output = { ...output, state: 'DONE' };
    myLogger.info('All record have been cleared.');
  } catch (error) {
    myLogger.error(JSON.stringify(error));
    output = { ...output, state: 'ERROR', error: JSON.stringify(error) };
  }

  mutex.release();

  //   res.send(result);
  res.send(output);
});

module.exports = router;
