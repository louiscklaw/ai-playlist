'use strict';
 
const express = require('express');
const bodyParser = require('body-parser');
const { myLogger } = require('./utils/myLogger');
const PORT = 3000;

try {
  const app = express();
  app.use(bodyParser.json());

  // app.use('/jobsdbPostExtract', require('./routes/jobsdbPostExtract'));
  app.use('/post_helloworld', require('./routes/post_helloworld'));
  app.use('/helloworld', require('./routes/helloworld'));
  app.use('/healthcheck', require('./routes/healthcheck'));

  myLogger.info('api-debug started');
  myLogger.info('%o', { hello: 'world' });

  // // Start the server
  app.listen(PORT, () => {
    myLogger.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  myLogger.info('error during starting express');
  myLogger.info(error);
}
