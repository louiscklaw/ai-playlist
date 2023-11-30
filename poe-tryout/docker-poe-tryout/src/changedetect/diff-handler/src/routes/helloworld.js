const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('diff-handler, Hello World!');
});

module.exports = router;
