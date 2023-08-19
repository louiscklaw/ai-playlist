const fs = require('fs'),
  path = require('path');
const puppeteer = require('puppeteer-core');

const express = require('express');
const router = express.Router();

const BROWSERLESS_HOST = 'changedetection-chrome';

router.post('/search', async (req, res) => {
  var output = { state: 'init', debug: {}, error: {} };
  try {
    var { body } = req;
    var { search } = body;
    output = { ...output, state: 'start', debug: { search } };
    // if (!validUrl.isUri(url)) throw new Error(`invalid url ${url}`);

    console.log('start browserless');
    browser = await puppeteer.connect({
      browserWSEndpoint: `ws://${BROWSERLESS_HOST}:3000`,
      defaultViewport: { width: 1920, height: 1080 * 3 },
    });

    // e.g. https://hk.jobsdb.com/hk/search-jobs/validation-automation-engineer/1
    page = await browser.newPage();

    var string_search = search.join('-');

    var url = `https://hk.jobsdb.com/hk/search-jobs/${string_search}/1`;
    console.log(`go to url ${url}`);
    output = { ...output, url };
    await page.goto(url, { waitUntil: 'networkidle2' });

    console.log('take screenshot');
    await page.screenshot({ path: '/share/helloworld.png', fullPage: true });

    const all_links = await page.evaluate(() => {
      var links = [];

      document.querySelectorAll('a[href*="/hk/en/job"]').forEach(ele => {
        var div_link = ele;
        links.push(div_link.getAttribute('href').split('?').shift());
      });
      return links;
    });

    const post_links = all_links.filter(l => l.search('-') > -1);

    output = { ...output, state: 'done', post_links };
  } catch (error) {
    console.log(error);
    output = { ...output, state: 'error', error: error.message };
  }
  res.send(output);
});

router.get('/helloworld', (req, res) => {
  res.send('fetchSearchResult scraper Hello, World!');
});

module.exports = router;
