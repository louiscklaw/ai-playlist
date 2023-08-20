const express = require('express');
const router = express.Router();

const { Queue, getInactiveCount } = require('../queue');

router.get('/', (req, res) => {
  try {
    console.log('count called.');
    

    res.send({
        count: getInactiveCount()
    });

  } catch (error) {
    console.log(error);

  }
});

module.exports = router;
