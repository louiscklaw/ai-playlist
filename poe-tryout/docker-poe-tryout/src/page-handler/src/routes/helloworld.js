const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.send('page-handler Hello, World!');
  } catch (error) {
    myLogger.error('hello error');
  }
});

module.exports = router;
