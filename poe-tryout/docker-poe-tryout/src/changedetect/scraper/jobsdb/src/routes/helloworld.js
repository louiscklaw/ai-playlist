const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('jobsdb-scraper, Hello World!');
});

module.exports = router;
