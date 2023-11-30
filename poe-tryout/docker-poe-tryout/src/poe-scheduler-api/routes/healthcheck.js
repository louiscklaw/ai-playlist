const express = require('express');
const { myLogger } = require('../utils/myLogger');
const router = express.Router();

myLogger.info('init healthcheck route');

router.get('/', (req, res) => {
  try {
    res.send('OK');
  } catch (error) {}
});

module.exports = router;
