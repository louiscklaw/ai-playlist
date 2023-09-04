// const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');
// const { postHelloworld } = require('../../../fetch/postHelloworld');
// const { loadJson } = require('../../../utils/loadJson');
const fs = require('fs'),
  path = require('path');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

const { calculateMD5 } = require('../../../utils/calculateMD5');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');
const { myLogger } = require('../../../utils/myLogger');

/**
 * Retrieves the working directory from the payload.
 * If it is not provided, falls back to a default value.
 *
 * @param {object} payload - The payload object containing properties.
 * @returns {string} - The working directory path.
 */
async function getWorkingDirFromPayload(payload) {
  var output = { state: 'INIT', debug: payload, error: '' };

  try {
    // Destructuring assignment to extract 'working_dir' property from 'payload' object
    var { working_dir } = payload;

    // Log value of 'working_dir'
    myLogger.info(working_dir);

    if (!working_dir) {
      // Check if 'working_dir' is falsy (undefined, null, empty string)
      myLogger.warn('self testing ? working_dir undefined');

      // Set a fallback default value for 'working_dir'
      working_dir = `/share/testing`;

      // Log the fallback value
      myLogger.warn(`fallback to default working_dir ${working_dir}`);
    }

    return working_dir; // Return the value of 'working_d
  } catch (error) {
    output = { ...output, state: 'error', error: JSON.stringify(error) };

    await createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
    fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

    myLogger.error('error during getWorkingDirFromPayload');
    myLogger.error(JSON.stringify(error));
  }
}

module.exports = { getWorkingDirFromPayload };
