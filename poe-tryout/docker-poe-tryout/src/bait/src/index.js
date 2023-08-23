'use strict';

const PORT = 8080;

const express = require('express');
const bodyParser = require('body-parser');
const { getRandomInt } = require('./utils/getRandomInt');
// const { sayHelloworldblablabla } = require('./utils/helloworld/blablabla/test');
// const { sayHelloworldblablabla } = require('./utils/helloworld/blablabla/test');

const app = express();

try {
  // sayHelloworldblablabla()
  app.use(bodyParser.json());
  app.use(express.static('public'));

  app.use('/fetchSearchResult', require('./routes/fetchSearchResult'));

  app.use('/helloworld', (req, res) => {
    var random_int = getRandomInt(10000, 100);
    res.send({ hello: 'world', random_int });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // app.use('/postCbHelloworld', require('./routes/postCbHelloworld'));
} catch (error) {
  console.log('error during init 111');
  console.log(error);
}
