const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send({ state: 'helloworld_done_called' });
});

module.exports = router;
