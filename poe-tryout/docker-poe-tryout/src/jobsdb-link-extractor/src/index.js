'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT = 3000;

const helloworldRoutes = require('./routes/helloworld');
app.use('/helloworld', helloworldRoutes);

const jobsdbPostExtractRoutes = require('./routes/jobsdbPostExtract');
app.use('/jobsdbPostExtract', jobsdbPostExtractRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
