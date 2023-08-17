const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');

var { PORT } = process.env;
if (!PORT) PORT = 3000;

const JobPostModel = require('./models/JobPost');
const HelloworldModel = require('./models/Helloworld');

try {
  const app = express();
  const router = express.Router();

  app.use(bodyParser.json());
  app.use(methodOverride());
  app.use(router);

  mongoose.connect('mongodb://mongo:27017/database');

  restify.serve(router, JobPostModel);
  restify.serve(router, HelloworldModel);

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
