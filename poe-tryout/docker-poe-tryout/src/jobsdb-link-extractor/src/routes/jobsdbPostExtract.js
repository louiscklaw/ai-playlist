'use strict';

const { SRC_ROOT, BROWSERLESS_HOST, SCREENSHOT_ROOT } = require('../config');

const fs = require('fs'),
  path = require('path');
const puppeteer = require('puppeteer-core');

const express = require('express');
const { postResult } = require('../util/postResult');
const router = express.Router();



router.post('/', async (req, res) => {
  console.log('/jobsdbPostExtract called');
  const {callback_url} = req.body;

  res.send({state: 'scheduled'})

  var output = { state: 'INIT', extracted: {}, debug: {}, error: {} };
  var browser = {},
    page = {};

  var retry = 3;
  var done = false;
  for (var i = 0; i < retry; i++) {
    try {
      // NOTE: input validation, may be set a schema here ?
      const req_body = req.body;
      const { url } = req_body;
      console.log({ url });



      const post_id = url.replace('.html','').split('-').pop();
      if (!post_id) throw new Error('post_id is required');

      // const url = `https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868`;

      // NOTE: considerate the test, split the calculation to call input
      // const post_id = url.split('-').pop();

      // slowMo: 1,
      browser = await puppeteer.connect({
        browserWSEndpoint: `ws://${BROWSERLESS_HOST}:3000`,
        defaultViewport: { width: 1920, height: 1080 * 3 },
      });
      page = await browser.newPage();
      await page.goto(url, { waitUntil: 'networkidle2' });

      console.log('browser started');

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
          'div[data-automation="job-details-job-highlights"] > div:nth-child(1) > div:nth-child(2)',
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

      var screenshot_path = `${SCREENSHOT_ROOT}/jobsdb_${post_id}.png`;
      await jobPage.screenshot({ path: screenshot_path, fullPage: true });

      var extracted = {
        post_id,
        jobTitle,
        companyName,
        _jobDetailsHeaderRawHTML,
        _debugList,
        jobAddress,
        postDate,
        jobHighlight,
        jobDescription,
      };

      output = { ...output, state: 'extract_done', extracted };

      done = true;
    } catch (error) {
      console.log(error);
      output = { ...output, state: 'extraction_error', error };
    }

    if (done) {
      console.log('done exitting...');
      break;
    }
  }

  // console.log({output})
  await postResult(callback_url, output.extracted)
  
});

module.exports = router;
