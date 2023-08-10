'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// const { helloworldFlow } = require('./state_machine/helloworldFlow');
// const { jobsdbFlowMachine } = require('./state_machine/jobsdbFlowMachine');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const jobsdbFlowRoutes = require('./routes/jobsdb_flow');
app.use('/jobsdb_flow', jobsdbFlowRoutes);

const helloworldRoutes = require('./routes/helloworld');
app.use('/helloworld', helloworldRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
