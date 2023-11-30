const express = require('express');
const bodyParser = require('body-parser');

const { myLogger } = require('./utils/myLogger');
const { PORT } = require('./config');

try {
  const app = express();
  app.use(bodyParser.json());

  app.use('/fetchSearchResult', require('./routes/fetchSearchResult'));
  
  app.use('/post_helloworld', require('./routes/post_helloworld'));
  app.use('/helloworld', require('./routes/helloworld'));
  app.use('/healthcheck', require('./routes/healthcheck'));

  // // Start the server
  app.listen(PORT, () => {
    myLogger.info(`Server is running on port ${PORT}`);
  });
} catch (error) {
  myLogger.error('error during starting express');
  myLogger.error(error.message);
}
