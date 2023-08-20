const express = require('express');
const { myLogger } = require('../utils/myLogger');
const router = express.Router();

myLogger.info('init helloworld route');

router.get('/', (req, res) => {
  try {
    res.send('api-debug Hello, World!');
  } catch (error) {}
});

module.exports = router;
