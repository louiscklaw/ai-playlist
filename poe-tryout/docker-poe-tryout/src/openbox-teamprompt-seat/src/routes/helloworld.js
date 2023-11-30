const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('openbox-teamprompt-seat, Hello World!');
});

module.exports = router;
