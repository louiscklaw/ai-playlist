const express = require('express');
const router = express.Router();

const { Queue, getInactiveCount } = require('../queue');
const { myLogger } = require('../utils/myLogger');

router.get('/', (req, res) => {
  try {
    myLogger.info('count called.');

    res.send({
      count: getInactiveCount(),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
