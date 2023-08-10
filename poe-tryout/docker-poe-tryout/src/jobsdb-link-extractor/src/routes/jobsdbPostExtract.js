'use strict';

const { SRC_ROOT, BROWSERLESS_HOST, SCREENSHOT_ROOT } = require('../config');

const fs = require('fs'),
  path = require('path');
const puppeteer = require('puppeteer-core');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const req_body = req.body;
  const { post_id, url } = req_body;
  // const url = `https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868`;
  
  // NOTE: considerate the test, split the calculation to call input
  // const post_id = url.split('-').pop();

  console.log(`extracting job with post_id ${post_id}`);

  const browser = await puppeteer.connect({
    browserWSEndpoint: `ws://${BROWSERLESS_HOST}:3000`,
    slowMo: 1,
    defaultViewport: { width: 1920, height: 1080 * 3 },
  });
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2',
  });

  var state = 'starting';
  var extracted = {};
  var debug_info = {};

  try {
    const jobPage = page;

    const jobTitle = await jobPage.evaluate(() => {
      const title = document.querySelector('div[data-automation="detailsTitle"] h1').textContent;
      return title;
    });

    const _jobDetailsHeaderRawHTML = await jobPage.evaluate(() => {
      const title = document.querySelector('div[data-automation="jobDetailsHeader"]').outerHTML;
      return title;
    });
    const { companyName, jobAddress, postDate, _debugList } = await jobPage.evaluate(() => {
      var output = {};
      var debugList = [];
      document.querySelectorAll('div[data-automation="jobDetailsHeader"] span').forEach((ele, idx) => {
        if (idx == 1) output['companyName'] = ele.textContent || '';
        if (idx == 2) output['jobAddress'] = ele.textContent || '';
        if (idx == 3) output['postDate'] = ele.textContent || '';
        debugList.push(ele.innerHTML);
      });
      output['_debugList'] = debugList;
      return output;
    });

    const jobHighlight = await jobPage.evaluate(() => {
      const title = document.querySelector(
        'div[data-automation="job-details-job-highlights"] > div:nth-child(1)  > div:nth-child(2)',
      ).textContent;
      return title;
    });
    var jobDescription = await jobPage.evaluate(() => {
      const description = document.querySelector('div[data-automation="jobDescription"]').textContent;
      return description;
    });
    // NOTE: string_cleaning_test.js
    jobDescription = jobDescription.replace(/\n +/g, '\n');
    jobDescription = jobDescription.replace(/\n+/g, '\n');

    await jobPage.screenshot({ path: `${SCREENSHOT_ROOT}/jobsdb_${post_id}.png`, fullPage: true });

    // console.log('halt at timeout');
    // await page.waitForTimeout(999 * 1000);
    state = 'extract success';
    extracted = {
      jobTitle,
      companyName,
      _jobDetailsHeaderRawHTML,
      _debugList,
      jobAddress,
      postDate,
      jobHighlight,
      jobDescription,
    };
  } catch (error) {
    state = 'error during extraction';
    debug_info = error;
  } finally {
    await page.close();
    await browser.close();

    res.send({
      state,
      url,
      extracted,
      debug_info,
    });
  }
});

module.exports = router;
