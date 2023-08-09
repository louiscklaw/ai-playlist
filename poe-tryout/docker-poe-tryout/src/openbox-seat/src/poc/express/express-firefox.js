const puppeteer = require('puppeteer-core');
var assert = require('chai').assert;
require('dotenv').config();

const { FIREFOX_DATA_DIR } = process.env;

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
