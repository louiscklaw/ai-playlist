'use strict';

const fs = require('fs'),
  path = require('path');
const puppeteer = require('puppeteer-core');
const BROWSERLESS_HOST = 'link-extractor-chrome';
const SCREENSHOT_ROOT = '/share/screenshot';

const SRC_ROOT = __dirname;

(async () => {
  const url = `https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868`;
  const post_id = url.split('-').pop();
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
  const jobDescription = await jobPage.evaluate(() => {
    const title = document.querySelector('div[data-automation="jobDescription"]').textContent;
    return title;
  });

  console.log({
    result: {
      jobTitle,
      companyName,
      _jobDetailsHeaderRawHTML,
      _debugList,
      jobAddress,
      postDate,
      jobHighlight,
      jobDescription,
    },
  });

  await jobPage.screenshot({ path: `${SCREENSHOT_ROOT}/jobsdb_${post_id}.png`, fullPage: true });

  // console.log('halt at timeout');
  // await page.waitForTimeout(999 * 1000);

  await page.close();
  await browser.close();

  console.log('extraction done');
})();
