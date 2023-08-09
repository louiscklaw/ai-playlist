'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// const { helloworldFlow } = require('./state_machine/helloworldFlow');
const { jobsdbFlowMachine } = require('./state_machine/jobsdbFlowMachine');

const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const helloworldRoutes = require('./routes/helloworld');
app.use('/helloworld', helloworldRoutes);

jobsdbFlowMachine.handle('e_extract_job_detail');
jobsdbFlowMachine.handle('e_extraction_done');
jobsdbFlowMachine.handle('e_summarize_job_detail');
jobsdbFlowMachine.handle('e_summarize_done');
jobsdbFlowMachine.handle('e_draft_email');
jobsdbFlowMachine.handle('e_draft_email_done');

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
