const express = require('express');
const router = express.Router();

router.get('/helloworld', (req, res) => {
  res.send('fetchSearchResult scraper Hello, World!');
});

module.exports = router;
