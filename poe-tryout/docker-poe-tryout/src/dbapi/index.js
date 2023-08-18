var http = require('http');

var AsyncLock = require('async-lock');
const mongoose = require('mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const restify = require('express-restify-mongoose');

var { PORT } = process.env;
if (!PORT) PORT = 3000;

const JobPostModel = require('./models/JobPost');
const HelloworldModel = require('./models/Helloworld');
const { CustomerModel } = require('./models/Customer');
const { InvoiceModel } = require('./models/Invoice');

try {
  var lock = new AsyncLock();

  mongoose.connect('mongodb://mongo:27017/database');
  console.log('connected to mongoose');

  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride('X-HTTP-Method-Override'));

  const router = express.Router();

  app.use(bodyParser.json());
  app.use(methodOverride());

  restify.serve(app, JobPostModel);
  restify.serve(app, HelloworldModel);
  restify.serve(app, CustomerModel);
  restify.serve(app, InvoiceModel);

  app.use(router);

  // app.listen(PORT, () => {
  //   console.log(`Express server listening on port ${PORT}`);
  // });

  http.createServer(app).listen(PORT, function () {
    console.log(`Express server listening on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
