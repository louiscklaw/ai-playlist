const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  console.log('/done called');
  const req_body = req.body;
  console.log({ req_body });

  res.send({ state: 'helloworld_done_called' });
});

module.exports = router;
