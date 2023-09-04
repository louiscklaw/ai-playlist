const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  try {
    res.send('Hello, World!');
  } catch (error) {}
});

module.exports = router;
