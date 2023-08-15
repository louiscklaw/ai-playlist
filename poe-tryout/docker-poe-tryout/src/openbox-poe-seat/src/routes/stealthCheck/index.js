const express = require('express');
const { stealthCheck } = require('../../worker/poe/stealthCheck');
const router = express.Router();

const STEALTHCHECK_CHECK_OK = 'STEALTHCHECK_CHECK_OK';
const STEALTHCHECK_CHECK_FAILED = 'STEALTHCHECK_CHECK_FAILED';

router.post('/', async (req, res) => {
  try {
    await stealthCheck();

    res.send({ state: STEALTHCHECK_CHECK_OK });
  } catch (error) {
    console.log(error);
    res.send({ state: STEALTHCHECK_CHECK_FAILED, error });
  }
});

module.exports = router;
