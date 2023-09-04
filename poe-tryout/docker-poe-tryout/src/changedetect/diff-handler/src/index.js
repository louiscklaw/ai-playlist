'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { myLogger } = require('./utils/myLogger');

const PORT = 3000;

try {
  const app = express();
  app.use(bodyParser.json());

  // app.use('/jobsdbPostExtract', require('./routes/jobsdbPostExtract'));
  // process diffs and route to entry point of flow-handler
  app.use('/jobsdb_diff_handler', require('./routes/jobsdb_diff_handler'));

  app.use('/post_helloworld', require('./routes/post_helloworld'));

  app.use('/helloworld', require('./routes/helloworld'));
  app.use('/healthcheck', require('./routes/healthcheck'));

  // // Start the server
  app.listen(PORT, () => {
    myLogger.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  myLogger.error('error during starting express');
  myLogger.error(JSON.stringify(error));
}
