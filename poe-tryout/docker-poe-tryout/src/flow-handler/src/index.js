'use strict';

const { myLogger } = require('./utils/myLogger');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

// const { helloworldFlow } = require('./state_machine/helloworldFlow');
// const { jobsdbFlowMachine } = require('./state_machine/jobsdbFlowMachine');

try {
  myLogger.log('info', { message: 'flow-handler start' });

  const app = express();
  app.use(bodyParser.json());

  app.use('/report-job-complete', require('./routes/reportJobComplete'));

  app.use('/jobsdb_link_extract_cb', require('./routes/jobsdb_link_extract_cb'));
  app.use('/jobsdb_link_extract', require('./routes/jobsdb_link_extract'));

  app.use('/jobsdb_draft_email_cb', require('./routes/jobsdb_draft_email_cb'));
  app.use('/jobsdb_draft_email', require('./routes/jobsdb_draft_email'));

  // TODO: rename to _poe_summarize
  app.use('/jobsdb_flow_summarize_cb', require('./routes/jobsdb_flow_summarize_cb'));
  app.use('/jobsdb_flow_summarize', require('./routes/jobsdb_flow_summarize'));

  app.use('/jobsdb_flow_poe_cb', require('./routes/jobsdb_flow_poe_cb'));
  app.use('/jobsdb_flow', require('./routes/jobsdb_flow'));

  app.use('/helloworld', require('./routes/helloworld'));
  app.use('/healthcheck', require('./routes/healthcheck'));

  // Start the server
  app.listen(PORT, () => {
    myLogger.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  myLogger.error(JSON.stringify(error));
}
