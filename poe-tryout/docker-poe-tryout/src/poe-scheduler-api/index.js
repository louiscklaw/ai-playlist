'use strict';

const PORT = 3002;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const { myLogger } = require('./utils/myLogger');

try {
  app.use(bodyParser.json());

  app.use('/count', require('./routes/count'));
  
  app.use('/ask_poe_parse_md', require('./routes/ask_poe_parse_md'));
  app.use('/ask_poe', require('./routes/ask_poe'));

  app.use('/process_new_job_post', require('./routes/process_new_job_post'));
  app.use('/ask_jobsdb_post', require('./routes/ask_jobsdb_post'));
  app.use('/healthcheck', require('./routes/healthcheck'));

  // TODO: remove dummy as debug only
  // app.use('/ask_dummy_call', require('./routes/ask_dummy_call'));
  // app.use('/askJobPostDummy', require('./routes/askJobPostDummy'));

  app.use('/done', require('./routes/done'));

  app.use('/postHelloworld', require('./routes/postHelloworld'));
  app.use('/ask_dummy_call', require('./routes/ask_dummy_call'));

  app.use('/helloworld', require('./routes/helloworld'));
  app.use('/healthcheck', require('./routes/healthcheck'));

  myLogger.info('started');

  // Start the server
  app.listen(PORT, () => {
    myLogger.info(`Server is running on port ${PORT}`);
  });

  // app.use('/postCbHelloworld', require('./routes/postCbHelloworld'));
} catch (error) {
  myLogger.info('error during init poe-scheduler');
  console.log(error);
}
