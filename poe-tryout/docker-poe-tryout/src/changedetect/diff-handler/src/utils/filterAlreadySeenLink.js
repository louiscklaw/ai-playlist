const fs = require('fs');
const path = require('path');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

const { myLogger } = require('../utils/myLogger');

const { isNewLink } = require('../utils/isNewLink');
const { createDirIfNotExists } = require('./createDirIfNotExists');
const { calculateMD5 } = require('./calculateMD5');

async function filterAlreadySeenLink(links, client) {
  var new_links = [];
  var output = { state: 'init', debug: links, error: '' };

  try {
    output = { ...output, state: 'start' };
    for (var i = 0; i < links.length; i++) {
      var x = links[i].toString();
      if (await isNewLink(x, client)) {
        new_links.push(x);
      } else {
        myLogger.info(`already seen, skipping ${x}`);
      }
    }
  } catch (error) {
    output = { ...output, state: 'error', new_links, error: JSON.stringify(error) };

    await createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
    fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

    myLogger.error(JSON.stringify(error));
  }

  return new_links;
}

module.exports = { filterAlreadySeenLink };
