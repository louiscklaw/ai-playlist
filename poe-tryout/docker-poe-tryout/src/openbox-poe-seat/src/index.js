const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const { myLogger } = require('./utils/myLogger');
const { reportOffline } = require('./utils/reportPoeSeatOffline');
const { reportOnline } = require('./utils/reportPoeSeatOnline');

const app = express();
app.use(bodyParser.json());

try {
  const summarizeRoutes = require('./routes/summarize');
  const chatGPTRoutes = require('./routes/chatGPT');
  const googlePalmRoutes = require('./routes/googlePalm');

  // NOTE: abonded ?
  app.use('/summarize', summarizeRoutes);
  // NOTE: abonded ?

  app.use('/chatGPT', chatGPTRoutes);
  app.use('/googlePalm', googlePalmRoutes);
  app.use('/stealthCheck', require('./routes/stealthCheck'));

  app.use('/healthcheck', require('./routes/healthcheck'));
  app.use('/hello', require('./routes/hello'));
  app.use('/helloworld', require('./routes/helloworld'));

  reportOnline();

  // Start the server
  app.listen(3000, () => {
    myLogger.info('Server is running on port 3000');
  });
} catch (error) {
  myLogger.error(JSON.stringify(error));

  reportOffline();
}
