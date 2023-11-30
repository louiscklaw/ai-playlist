const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const { myLogger } = require('./utils/myLogger');

const app = express();
app.use(bodyParser.json());


try {
  app.use('/stealthCheck', require('./routes/stealthCheck'));

  app.use('/helloworld', require('./routes/helloworld'));

  app.use('/teamprompt', require('./routes/teamprompt'));

  console.log("helloworld")

  // Start the server
  app.listen(3000, () => {
    myLogger.info('Server is running on port 3000');
  });
} catch (error) {
  // myLogger.error(JSON.stringify(error));
  throw error

}
