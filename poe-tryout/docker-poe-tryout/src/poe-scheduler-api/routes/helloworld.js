const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('poe-scheduler-api, Hello World!');
});

module.exports = router;
