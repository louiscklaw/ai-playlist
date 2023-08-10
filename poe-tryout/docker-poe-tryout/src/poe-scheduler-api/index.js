'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT = 3002;

const helloworldRoutes = require('./routes/helloworld');
const processNewJobPostRoutes = require('./routes/process_new_job_post');
const askJobsdbPostRoutes = require('./routes/ask_jobsdb_post');
const doneRoutes = require('./routes/done');

app.use('/helloworld', helloworldRoutes);
app.use('/process_new_job_post', processNewJobPostRoutes);
app.use('/ask_jobsdb_post', askJobsdbPostRoutes);

app.use('/postHelloworld', require('./routes/postHelloworld'));

app.use('/done', doneRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
