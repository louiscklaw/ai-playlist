const fetch = require('node-fetch');
const chalk = require('chalk');

(async () => {
    console.log('api status')
    require('./check/glassdoor-scraper')();

    // require('./check/diff-handler')();
    // require('./check/flow-handler')();
    // require('./check/dbapi')();
    // require('./check/poe-scheduler-api')();
    // require('./check/jobsdb-link-extractor')();
    // require('./check/page-handler')();



})();
