const fs = require('fs'),
  path = require('path');

const express = require('express');
const { getRandomInt } = require('../../utils/getRandomInt');
const router = express.Router();

const BROWSERLESS_HOST = 'changedetection-chrome';

//TODO: helloworld

router.post('/result1', async (req, res) => {
  var random_int = getRandomInt(1000000, 100);
  res.send({
    debug: {
      search: ['validation', 'automation', 'engineer'],
    },
    error: {},
    post_links: [
      // `/hk/en/job/job-job-job-11111111${random_int}`,
      // `/hk/en/job/job-job-job-22${random_int}`,
      // `/hk/en/job/job-333${random_int}`,
      // "/hk/en/job/job-job-100003010508305",
      `/hk/en/job/automation-hardware-engineer-ai-lab-${random_int}-100003010505170`,
    ],
    state: 'done',
    url: 'https://hk.jobsdb.com/hk/search-jobs/validation-automation-engineer/1',
  });
});

module.exports = router;
