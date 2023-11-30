var http = require('http');

// var AsyncLock = require('async-lock');
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
const { myLogger } = require('./utils/myLogger');

// const { PoeSeatStatusModel } = require('./models/PoeSeatStatus');

try {
  // var lock = new AsyncLock();

  mongoose.connect('mongodb://mongo:27017/database');

  // TODO: mongoose.set('strictQuery', true);

  myLogger.info('connected to mongoose');

  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride('X-HTTP-Method-Override'));

  const router = express.Router();

  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use('/Customer/addCount', require('./routes/Customer/addCount'));

  restify.serve(app, JobPostModel);
  restify.serve(app, HelloworldModel);

  restify.serve(app, CustomerModel);
  restify.serve(app, InvoiceModel);

  // http://dbapi:3001/PoeSeatStatus/online/hello_poe_host
  // tests/PoeSeatStatus/poe_online.js
  app.use('/PoeSeatStatus/online', require('./routes/PoeSeatStatus/online'));
  app.use('/PoeSeatStatus/offline', require('./routes/PoeSeatStatus/offline'));
  app.use('/PoeSeatStatus/getStatus', require('./routes/PoeSeatStatus/getStatus'));
  app.use('/PoeSeatStatus/clearAll', require('./routes/PoeSeatStatus/clearAll'));

  app.use('/VisitedLink/clearAll', require('./routes/VisitedLink/clearAll'));
  app.use('/VisitedLink/addLink', require('./routes/VisitedLink/addLink'));


  app.use(router);
  
  app.use('/helloworld', require('./routes/helloworld'));
  app.use('/healthcheck', require('./routes/healthcheck'));
  
  myLogger.info('init dbapi done');

  http.createServer(app).listen(3001, function () {
    myLogger.info(`Express server listening on port ${PORT}`);
  });
} catch (error) {
  myLogger.error(error);
}
