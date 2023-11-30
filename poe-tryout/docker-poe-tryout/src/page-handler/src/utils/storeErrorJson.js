const fs = require('fs');
const { calculateMD5 } = require('./calculateMD5');
const { myLogger } = require('./myLogger');

function storeErrorJson(content_to_store, filepath = '/logs/error') {
  try {
    var md5 = calculateMD5(content_to_store);
    var content = JSON.stringify(content_to_store);
    var filename = `${filepath}/${md5}.json`;
    fs.writeFileSync(filename, content, { encoding: 'utf8' });
  } catch (error) {
    console.log(error);
    myLogger.error('error during log error');
  }
}

module.exports = { storeErrorJson };
