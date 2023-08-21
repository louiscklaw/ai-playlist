const express = require('express');
const router = express.Router();
const { myLogger } = require('../utils/myLogger');

router.post('/', (req, res) => {
  myLogger.info('/done called');
  const req_body = req.body;
  myLogger.info('%o', { req_body });

  res.send({ state: 'helloworld_done_called' });
});

module.exports = router;
