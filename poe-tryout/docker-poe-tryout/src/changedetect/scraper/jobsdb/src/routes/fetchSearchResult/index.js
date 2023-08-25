// const fs = require('fs'),
//   path = require('path');
const fs = require('fs');
const ERROR_LOG_DIR = '/logs/error/fetchSearchResult';

const puppeteer = require('puppeteer-core');

const express = require('express');
const router = express.Router();

const { getRandomInt } = require('../../utils/getRandomInt');
const { myLogger } = require('../../utils/myLogger');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');
const { calculateMD5 } = require('../../utils/calculateMD5');

const BROWSERLESS_HOST = 'changedetection-chrome';

router.post('/search', async (req, res) => {
  var output = { state: 'init', debug: {}, error: '' };
  try {
    var { body } = req;
    var { search } = body;
    output = { ...output, state: 'start', debug: { search } };
    // if (!validUrl.isUri(url)) throw new Error(`invalid url ${url}`);

    myLogger.info('start browserless');
    browser = await puppeteer.connect({
      browserWSEndpoint: `ws://${BROWSERLESS_HOST}:3000`,
      defaultViewport: { width: 1920, height: 1080 * 3 },
    });

    // e.g. https://hk.jobsdb.com/hk/search-jobs/validation-automation-engineer/1
    page = await browser.newPage();

    var string_search = search.join('-');

    var url = `https://hk.jobsdb.com/hk/search-jobs/${string_search}/1`;
    myLogger.info(`go to url ${url}`);
    output = { ...output, url };
    await page.goto(url, { waitUntil: 'networkidle2' });

    myLogger.info('take screenshot');
    await page.screenshot({ path: '/share/helloworld.png', fullPage: true });

    const all_links = await page.evaluate(() => {
      var links = [];

      document.querySelectorAll('a[href*="/hk/en/job"]').forEach(ele => {
        var div_link = ele;
        links.push(div_link.getAttribute('href').split('?').shift());
      });
      return links;
    });

    // NOTE: TODO: temporary logic to handle filter job links from links
    const post_links = all_links.filter(l => l.search('-') > -1).sort();

    output = { ...output, state: 'done', post_links };
  } catch (error) {
    await createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;

    output = { ...output, state: 'error', error: JSON.stringify(error) };

    fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });
    myLogger.error('%o', error);
  }
  res.send(output);
});

router.get('/helloworld', (req, res) => {
  res.send('fetchSearchResult scraper Hello, World!');
});

module.exports = router;
