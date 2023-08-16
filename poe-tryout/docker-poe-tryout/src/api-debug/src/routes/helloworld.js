const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('api-debug Hello, World!');
});

module.exports = router;
