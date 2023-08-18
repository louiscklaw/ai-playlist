const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');

var { PORT } = process.env;
if (!PORT) PORT = 3000;

const JobPostModel = require('./models/JobPost');
const HelloworldModel = require('./models/Helloworld');

(async () => {
  try {
    const app = express();
    const router = express.Router();

    app.use(bodyParser.json());
    app.use(methodOverride());

    await mongoose.connect('mongodb://mongo:27017/database');
    console.log('connected to mongoose');

    restify.serve(router, JobPostModel);
    restify.serve(router, HelloworldModel);

    app.use(router);

    app.listen(PORT, () => {
      console.log(`Express server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
