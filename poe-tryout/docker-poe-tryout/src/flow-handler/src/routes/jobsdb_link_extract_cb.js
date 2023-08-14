const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  // console.log(req.body);
  console.log(__filename);
  res.send({hello:'jobsdb_link_extract_cb'});
});

module.exports = router;
