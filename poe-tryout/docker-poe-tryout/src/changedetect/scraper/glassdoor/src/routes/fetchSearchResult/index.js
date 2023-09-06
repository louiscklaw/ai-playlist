const fs = require('fs');
const path = require('path');

const puppeteer = require('puppeteer-core');
const express = require('express');
const router = express.Router();

const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

const { getRandomInt } = require('../../utils/getRandomInt');
const { myLogger } = require('../../utils/myLogger');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');
const { calculateMD5 } = require('../../utils/calculateMD5');

const { PLAYWRIGHT_DRIVER_URL } = require('../../config');
const { INIT, ERROR, START } = require('../../constants');
const Joi = require('joi');

router.post('/search', async (req, res) => {
  var output = { state: INIT, debug: req.body, error: '' };

  const url_schema = Joi.string().uri({
    scheme: [/https?/],
  });

  try {
    myLogger.info(req.body);
    var { search } = req.body;

    output = { ...output, state: START, search };
    myLogger.info('start browserless');

    // e.g. https://www.glassdoor.com.hk/Job/validation-engineer-jobs-SRCH_KO0,19.htm?sortBy=date_desc
    browser = await puppeteer.connect({
      browserWSEndpoint: PLAYWRIGHT_DRIVER_URL,
      defaultViewport: { width: 1920, height: 1080 * 3 },
    });

    page = await browser.newPage();
    var string_search = search.join('-');
    var url = `https://www.glassdoor.com.hk/Job/${string_search}-jobs-SRCH_KO0,19.htm?sortBy=date_desc`;

    // const { error } = Joi.validate('http:/', Joi.string().uri());
    const { error } = url_schema.validate(url);
    if (error) throw new Error('url valiation failed');

    myLogger.info(`go to url ${url}`);
    output = { ...output, url };

    await page.goto(url, { waitUntil: 'networkidle2' });
    myLogger.info('take screenshot');
    await page.screenshot({ path: '/share/glassdoor-scraper.png', fullPage: true });

    const result = await page.evaluate(() => {
      var all_links = [];
      document.querySelectorAll('a[href^="/partner"]').forEach(ele => {
        var div_link = ele;
        const full_url = 'https://www.glassdoor.com.hk' + div_link.getAttribute('href');

        all_links.push(full_url);
      });
      return JSON.stringify({ all_links });
    });
    const { all_links } = JSON.parse(result);

    const post_links = all_links
      .filter(l => {
        var { error } = url_schema.validate(l);
        return !error;
      })
      .sort();

    output = { ...output, state: 'done', post_links };
    // myLogger.info(JSON.stringify(output));
  } catch (error) {
    output = { ...output, state: ERROR, error: error.message };

    await createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
    fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

    myLogger.error(output);
  }

  myLogger.info('DONE');
  res.send(output);
});

router.get('/helloworld', (req, res) => {
  res.send('fetchSearchResult scraper Hello, World!');
});

module.exports = router;
