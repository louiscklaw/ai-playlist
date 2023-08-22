const fs = require('fs');

const { myLogger } = require('./myLogger');

async function loadJson(filepath) {
  var output = {};
  try {
    myLogger.info(`writing json file to ${filepath}`);

    var temp_raw = await fs.readFileSync(filepath, {
      encoding: 'utf-8',
    });

    output = JSON.parse(temp_raw);
  } catch (error) {
    myLogger.error('error during loadJson');
    console.log(error);
  }

  return output;
}

module.exports = { loadJson };
