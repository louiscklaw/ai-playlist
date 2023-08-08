const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('jobsdbPostExtract Hello, World!');
});

module.exports = router;
