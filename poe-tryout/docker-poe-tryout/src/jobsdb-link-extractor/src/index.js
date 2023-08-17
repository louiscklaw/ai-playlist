'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const PORT = 3000;

try {
    
  app.use('/jobsdbPostExtract', require('./routes/jobsdbPostExtract'));
  app.use('/helloworld', require('./routes/helloworld'));

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

} catch (error) {
  console.log(error)  
}