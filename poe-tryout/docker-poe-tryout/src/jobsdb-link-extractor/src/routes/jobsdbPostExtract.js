'use strict';
var validUrl = require('valid-url');

const { SRC_ROOT, BROWSERLESS_HOST, SCREENSHOT_ROOT } = require('../config');

const fs = require('fs'),
  path = require('path');
const puppeteer = require('puppeteer-core');

const express = require('express');
const { postResult } = require('../utils/postResult');
const { htmlToMarkdown } = require('../utils/htmlToMarkdown');
const router = express.Router();

const { myLogger } = require('../utils/myLogger');

router.post('/', async (req, res) => {
  myLogger.info('/jobsdbPostExtract called');

  try {
    // NOTE: sender-> src/flow-handler/src/state_machine/jobsdb/onExtractJobDetail.js
    const { jobsdb_job_url, callback_url } = req.body;
    if (!jobsdb_job_url) throw new Error('jobsdb job url is undefined');

    res.send({ state: 'scheduled' });

    async function getFromEvaluateTextContent(jobPage, title_selector) {
      var output = { result: '', error: {} };

      try {
        const o_jobTitle = await jobPage.evaluate(selector => {
          var output = { result: '', error: {} };
          try {
            const title = document.querySelector(selector).textContent;
            output = { ...output, result: title };
          } catch (error) {
            output = { ...output, error: error.message };
          }
          return output;
        }, title_selector);

        output = { ...output, result: o_jobTitle.result };
        // if (o_jobTitle.result == '')
        throw new Error('getFromEvaluateTextContent found empty');
      } catch (error) {
        myLogger.error('getFromEvaluateTextContent found empty');
        myLogger.error('"%o', {
          title_selector,
          url: jobPage.url(),
        });
        output = { ...output, error: error.message };
      }
      return output;
    }

    var output = { state: 'INIT', extracted: {}, debug: {}, error: {} };
    var browser = {},
      page = {};

    var retry = 3;
    var done = false;
    for (var i = 0; i < retry; i++) {
      try {
        // NOTE: input validation, may be set a schema here ?
        const req_body = req.body;

        // TODO: remove me
        // const { url } = req_body;

        myLogger.info('%o', { jobsdb_job_url });

        if (!validUrl.isUri(jobsdb_job_url)) throw new Error(`invalid url ${jobsdb_job_url}`);

        const post_id = jobsdb_job_url.replace('.html', '').split('-').pop();
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
        await page.goto(jobsdb_job_url, { waitUntil: 'networkidle2' });

        myLogger.info('browser started');

        const jobPage = page;
        var title_selector = 'div[data-automation="detailsTitle"] h1';
        var { result } = await getFromEvaluateTextContent(jobPage, title_selector);
        var jobTitle = result;

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

        output = { ...output, state: 'extract_done', extracted };

        done = true;
      } catch (error) {
        myLogger.error('%o', error);
        output = { ...output, state: 'extraction_error', error };
      }

      if (done) {
        myLogger.info('done exitting...');
        break;
      }
    }

    // NOTE: receiver -> src/flow-handler/src/routes/jobsdb_link_extract_cb.js
    await postResult(callback_url, output.extracted);
  } catch (error) {
    myLogger.error(error.message);
    myLogger.error('req.body %o', req.body);
    myLogger.error('error %o', error);
  }
});

module.exports = router;
