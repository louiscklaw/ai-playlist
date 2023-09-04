'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const { myLogger } = require('./utils/myLogger');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

try {
  app.use('/jobsdbPostExtract', require('./routes/jobsdbPostExtract'));

  app.use('/helloworld', require('./routes/helloworld'));

  app.use('/healthcheck', require('./routes/healthcheck'));

  myLogger.info('jobsdb-link-extractor start');

  // Start the server
  app.listen(PORT, () => {
    myLogger.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  myLogger.error(JSON.stringify(error));
}
