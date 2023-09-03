const fs = require('fs');

const { myLogger } = require('./myLogger');

async function loadJson(filepath) {
  var output = {};
  try {
    myLogger.info(`loading json file from ${filepath}`);

    var temp_raw = await fs.readFileSync(filepath, {
      encoding: 'utf-8',
    });

    output = JSON.parse(temp_raw);
  } catch (error) {
    myLogger.error('error during loadJson');
    console.log({filepath});
    console.log(error);
    throw error
  }

  return output;
}

async function loadMetaJson(filepath) {
  var output = {};
  try {
    if (!filepath) {
      myLogger.info('filepath is not defined, default to /share/testing/meta.json');
      filepath = '/share/testing';
    }
    output = loadJson(`${filepath}/meta.json`)

  } catch (error) {
    myLogger.error('error during loadMetaJson');
    console.log({filepath});
    console.log(error);
    throw error
  }

  return output;
}

module.exports = { loadJson, loadMetaJson };
