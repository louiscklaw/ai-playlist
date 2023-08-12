'use strict';

const { myLogger } = require('./utils/myLogger');
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

// const { helloworldFlow } = require('./state_machine/helloworldFlow');
// const { jobsdbFlowMachine } = require('./state_machine/jobsdbFlowMachine');

myLogger.log('info', { message: 'flow-handler start' });

const app = express();
app.use(bodyParser.json());

app.use('/jobsdb_draft_email_cb', require('./routes/jobsdb_draft_email_cb'));
app.use('/jobsdb_flow_summarize_cb', require('./routes/jobsdb_flow_summarize_cb'));
app.use('/jobsdb_flow_poe_cb', require('./routes/jobsdb_flow_poe_cb'));
app.use('/jobsdb_flow', require('./routes/jobsdb_flow'));
app.use('/helloworld', require('./routes/helloworld'));

// Start the server
app.listen(PORT, () => {
  myLogger.log('info', { message: `Server is running on port ${PORT}` });
});
