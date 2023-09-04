const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('flow-handler, Hello World!');
});

module.exports = router;
