'use strict';

const PORT = 3002;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use('/ask_poe', require('./routes/ask_poe'));
app.use('/process_new_job_post', require('./routes/process_new_job_post'));
app.use('/ask_jobsdb_post', require('./routes/ask_jobsdb_post'));

// app.use('/askJobPostDummy', require('./routes/askJobPostDummy'));

app.use('/done', require('./routes/done'));

app.use('/postHelloworld', require('./routes/postHelloworld'));
app.use('/helloworld', require('./routes/helloworld'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// app.use('/postCbHelloworld', require('./routes/postCbHelloworld'));
