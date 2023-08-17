'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

try {
  const app = express();
  app.use(bodyParser.json());

  // app.use('/jobsdbPostExtract', require('./routes/jobsdbPostExtract'));
  // process diffs and route to entry point of flow-handler
  app.use('/jobsdb_diff_handler', require('./routes/jobsdb_diff_handler'));

  app.use('/post_helloworld', require('./routes/post_helloworld'));
  app.use('/helloworld', require('./routes/helloworld'));

  // // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log('error during starting express');
  console.log(error);
}
