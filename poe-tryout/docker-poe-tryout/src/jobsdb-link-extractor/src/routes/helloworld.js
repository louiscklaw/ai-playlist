const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('link extractor Hello, World!');
});

module.exports = router;
