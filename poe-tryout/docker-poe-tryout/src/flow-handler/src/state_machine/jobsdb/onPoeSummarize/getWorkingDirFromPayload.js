const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');
const { postHelloworld } = require('../../../fetch/postHelloworld');
const { loadJson } = require('../../../utils/loadJson');
const { myLogger } = require('../../../utils/myLogger');

/**
 * Retrieves the working directory from the payload.
 * If it is not provided, falls back to a default value.
 *
 * @param {object} payload - The payload object containing properties.
 * @returns {string} - The working directory path.
 */
function getWorkingDirFromPayload(payload) {
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
}

module.exports = { getWorkingDirFromPayload };
