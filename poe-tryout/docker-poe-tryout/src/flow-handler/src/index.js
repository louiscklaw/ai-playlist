'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// const { helloworldFlow } = require('./state_machine/helloworldFlow');
// const { jobsdbFlowMachine } = require('./state_machine/jobsdbFlowMachine');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

app.use('/jobsdb_flow_summarize_cb', require('./routes/jobsdb_flow_summarize_cb'));
app.use('/jobsdb_flow_poe_cb', require('./routes/jobsdb_flow_poe_cb'));
app.use('/jobsdb_flow', require('./routes/jobsdb_flow'));

app.use('/helloworld', require('./routes/helloworld'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
