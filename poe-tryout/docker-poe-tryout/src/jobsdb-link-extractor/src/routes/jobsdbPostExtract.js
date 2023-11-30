'use strict';

// TEST: src/jobsdb-link-extractor/src/tests/jobsdbPostExtract/test2/index.js

var validUrl = require('valid-url');
const Joi = require('joi');

const { SRC_ROOT, BROWSERLESS_HOST, SCREENSHOT_ROOT, PLAYWRIGHT_DRIVER_URL } = require('../config');

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const express = require('express');
const { postResult } = require('../utils/postResult');
const { htmlToMarkdown } = require('../utils/htmlToMarkdown');
const router = express.Router();

const { myLogger } = require('../utils/myLogger');
const { getFromEvaluateTextContent } = require('../utils/getFromEvaluateTextContent');
const { helloworld_schema } = require('../schemas/helloworld_schema');
const { urlSchema } = require('../schemas/url_schema');
const { getPostIdFromJobsdbUrl } = require('./getPostIdFromJobsdbUrl');
const { getFromEvaluateOuterHtml } = require('../utils/getFromEvaluateOuterHtml');

const LINK_CONTAIN_NO_POST = 'LINK_CONTAIN_NO_POST';

// const schema = Joi.object({
//   url: Joi.string().uri().required(),
//   jobsdb_job_url: Joi.string().uri().required(),
//   callback_url: Joi.string().uri().required(),
// });

// TEST -> src/jobsdb-link-extractor/src/tests/jobsdbPostExtract/test1/index.js
// handle call from
// src/flow-handler/src/state_machine/jobsdb/onExtractJobDetail.js
// postJobsdbPostExtract
router.post('/', async (req, res) => {
  myLogger.info('/jobsdbPostExtract called');

  try {
    // NOTE: sender-> src/flow-handler/src/state_machine/jobsdb/onExtractJobDetail.js
    const { error } = helloworld_schema.validate(req.body);
    if (error) throw new Error('input json is invalid');

    try {
      const { jobsdb_job_url, callback_url } = req.body;
      if (jobsdb_job_url.trim().search(/https:\/\/hk.jobsdb.com\/?$/) > -1) throw new Error(LINK_CONTAIN_NO_POST);

      res.send({ state: 'scheduled' });

      var output = { state: 'INIT', extracted: {}, debug: {}, error: {} };
      var browser = {},
        page = {};

      var retry = 3;
      var done = false;

      for (var i = 0; i < retry; i++) {
        try {
          myLogger.info('%o', { jobsdb_job_url });

          if (urlSchema.validate(jobsdb_job_url).error) throw new Error(`invalid url ${jobsdb_job_url}`);

          const post_id = getPostIdFromJobsdbUrl(jobsdb_job_url);
          if (!post_id) throw new Error('post_id is required');

          // const url = `https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868`;

          // NOTE: considerate the test, split the calculation to call input
          // const post_id = url.split('-').pop();

          // slowMo: 1,

          browser = await puppeteer.connect({
            browserWSEndpoint: PLAYWRIGHT_DRIVER_URL,
            defaultViewport: { width: 1920, height: 1080 * 3 },
          });
          page = await browser.newPage();
          await page.goto(jobsdb_job_url, { waitUntil: 'networkidle2' });

          myLogger.info('browser started');

          const jobPage = page;
          var selector = 'div[data-automation="detailsTitle"] h1';
          var { result } = await getFromEvaluateTextContent(jobPage, selector);
          var jobTitle = result;

          // const _jobDetailsHeaderRawHTML = await jobPage.evaluate(() => {
          //   const title = document.querySelector('div[data-automation="jobDetailsHeader"]').outerHTML;
          //   return title;
          // });
          var selector = 'div[data-automation="jobDetailsHeader"]';
          await page.waitForSelector(selector);
          var { result } = await getFromEvaluateOuterHtml(jobPage, selector);
          var _jobDetailsHeaderRawHTML = result;
          myLogger.error(_jobDetailsHeaderRawHTML);

          var selector = 'div[data-automation="jobDetailsHeader"] span';
          await page.waitForSelector(selector);
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

          // const jobHighlight = await jobPage.evaluate(() => {
          //   const title = document.querySelector(
          //     'div[data-automation="job-details-job-highlights"] > div:nth-child(1) > div:nth-child(2)',
          //   ).textContent;
          //   return title;
          // });
          var selector = 'div[data-automation="job-details-job-highlights"] > div:nth-child(1) > div:nth-child(2)';
          await page.waitForSelector(selector);
          var { result } = await getFromEvaluateTextContent(jobPage, selector);
          var jobHighlight = result;

          var selector = 'div[data-automation="jobDescription"]';
          await page.waitForSelector(selector);
          var { description, _jobDescriptionRaw, __jobDescriptionRawProcessed } = await jobPage.evaluate(() => {
            const _jobDescriptionRaw = document.querySelector('div[data-automation="jobDescription"]').outerHTML;

            var __jobDescriptionRawProcessed = _jobDescriptionRaw.replace(
              /<\/[p|h1|h2|b]>/g,
              '{{this_should_be_a_newline}}</p>',
            );
            var html = document.createElement('html');
            html.innerHTML = __jobDescriptionRawProcessed;
            const description = html.textContent;

            return { description, _jobDescriptionRaw, __jobDescriptionRawProcessed };
          });
          // NOTE: string_cleaning_test.js
          var jobDescription = description;
          jobDescription = jobDescription.replace(/{{this_should_be_a_newline}}/g, '\n');
          jobDescription = jobDescription.replace(/\n +/g, '\n');
          jobDescription = jobDescription.replace(/\n+/g, '\n');
          jobDescription = jobDescription.replace(/ /g, ' ');

          var _jobDescriptionMd = htmlToMarkdown(_jobDescriptionRaw);
          fs.writeFileSync('/share/screenshot/hello-html.html', _jobDescriptionRaw, { encoding: 'utf8' });
          fs.writeFileSync('/share/screenshot/hello-md.md', _jobDescriptionMd, { encoding: 'utf8' });

          var screenshot_path = `${SCREENSHOT_ROOT}/jobsdb_${post_id}.png`;
          await jobPage.screenshot({ path: screenshot_path, fullPage: true });

          var extracted = {
            jobsdb_job_url,
            post_id,
            __jobDescriptionRawProcessed,
            _debugList,
            _jobDescriptionMd,
            _jobDescriptionRaw,
            _jobDetailsHeaderRawHTML,
            companyName,
            jobAddress,
            jobDescription,
            jobHighlight,
            jobTitle,
            postDate,
          };

          output = { ...output, state: 'EXTRACT_DONE', extracted };

          if (jobTitle) {
            done = true;
          } else {
            // NOTE: sometime job title is undefined even success
          }
        } catch (error) {
          myLogger.error(JSON.stringify(error));
          output = { ...output, state: 'EXTRACTION_ERROR', error };
        }

        if (done) {
          myLogger.info(`${jobsdb_job_url} done exiting...`);

          break;
        }
      }

      // NOTE: receiver -> src/flow-handler/src/routes/jobsdb_link_extract_cb.js
      await postResult(callback_url, output.extracted);
    } catch (error) {
      myLogger.error(JSON.stringify(error));
      throw error;
    }
  } catch (error) {
    if (error.message == LINK_CONTAIN_NO_POST) {
      myLogger.warn(`link contain no post, skipping`);
    } else {
      myLogger.error(JSON.stringify(error));
      // myLogger.error('req.body %o', req.body);
      // myLogger.error(JSON.stringify(error));
      throw error;
    }
  }
});

module.exports = router;
