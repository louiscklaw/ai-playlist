'use strict';

const PORT = 8080;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
try {
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.use('/helloworld', (req, res) => {
    res.send({ hello: 'world' });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // app.use('/postCbHelloworld', require('./routes/postCbHelloworld'));
} catch (error) {
  console.log('error during init');
  console.log(error);
}
