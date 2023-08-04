const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const restify = require('express-restify-mongoose');
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(methodOverride());

mongoose.connect('mongodb://mongo:27017/database');

restify.serve(
  router,
  mongoose.model(
    'JobPost',
    new mongoose.Schema({
      job_link: { type: String, required: true },
      position: { type: String },
      description: { type: String },
      state: { type: String, required: true }
    }, { timestamps: true }),
  ),
);

app.use(router);

var PORT = 3001;

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
});
