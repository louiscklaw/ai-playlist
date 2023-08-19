const fs = require('fs');

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  var req_body = req.body;
  console.log({ req_body });

  fs.writeFileSync('/share/diff.json', JSON.stringify(req_body), { encoding: 'utf8' });

  res.send('post api-debug Hello, World!');
});

module.exports = router;
