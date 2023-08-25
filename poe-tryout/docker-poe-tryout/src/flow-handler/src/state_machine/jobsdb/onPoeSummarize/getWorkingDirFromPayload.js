// const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');
// const { postHelloworld } = require('../../../fetch/postHelloworld');
// const { loadJson } = require('../../../utils/loadJson');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');
const { myLogger } = require('../../../utils/myLogger');
const ERROR_LOG_DIR = `/logs/error/getWorkingDirFromPayload`;

/**
 * Retrieves the working directory from the payload.
 * If it is not provided, falls back to a default value.
 *
 * @param {object} payload - The payload object containing properties.
 * @returns {string} - The working directory path.
 */
async function getWorkingDirFromPayload(payload) {
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
    await createDirIfNotExists(ERROR_LOG_DIR);

    var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;

    fs.writeFileSync(filename, JSON.stringify({ payload, error }), { encoding: 'utf8' });

    myLogger.error('error during getWorkingDirFromPayload');
    myLogger.error('%o', error);
  }
}

module.exports = { getWorkingDirFromPayload };
