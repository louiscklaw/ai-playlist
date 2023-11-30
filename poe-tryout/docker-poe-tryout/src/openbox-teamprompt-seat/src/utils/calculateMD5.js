const crypto = require('crypto');

function calculateMD5(object) {
  // Convert the object to a JSON string
  const jsonString = JSON.stringify(object);

  // Create a new Hash instance with 'md5' algorithm
  const md5Hash = crypto.createHash('md5');

  // Update the hash with the JSON string
  md5Hash.update(jsonString);

  // Calculate and return the hexadecimal representation of the hash digest
  return md5Hash.digest('hex');
}

module.exports = { calculateMD5 };
