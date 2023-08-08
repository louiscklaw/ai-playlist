'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT = 3002;

const helloworldRoutes = require('./routes/helloworld');
const processNewJobPostRoutes = require('./routes/process_new_job_post');

app.use('/helloworld', helloworldRoutes);
app.use('/process_new_job_post', processNewJobPostRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
