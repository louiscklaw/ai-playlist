// TODO: remove me
// 'use strict';
// const path = require('path');
// const fetch = require('node-fetch');
// const fs = require('fs');
// const { createDirIfNotExists } = require('../utils/createDirIfNotExists');
// const { writeOutputToDB } = require('../utils/writeOutputToDB');
// const { writeOutputToDirectory } = require('../utils/writeOutputToDirectory');
// const { mySleep } = require('../utils/mySleep');
// const { mySleepM } = require('../utils/mySleepM');

const { gpt_endpoint, getRandomOpenboxHost, JOBPOST_ENDPOINT } = require('../constants');
const { myLogger } = require('../utils/myLogger');

myLogger.info('poe Queue init');

function getRandomPoeEndpoint() {
  try {
    // http://openbox-poe-seat1:3000
    var random_openbox_host = getRandomOpenboxHost();
    const gpt_endpoint = `http://${random_openbox_host}:3000`;

    return { random_openbox_host, gpt_endpoint };
  } catch (error) {
    myLogger.info('error geting random poe endpoint, return default poe-seat');
    console.log(error);
    return 'http://openbox-poe-seat1:3000';
  }
}


module.exports = {  getRandomPoeEndpoint };
