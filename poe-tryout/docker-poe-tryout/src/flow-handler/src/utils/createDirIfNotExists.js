const fs = require('fs');

const { myLogger } = require('./myLogger');

async function createDirIfNotExists(chatgpt_output_filename) {
  try {
    await fs.mkdirSync(chatgpt_output_filename);
  } catch (error) {
    myLogger.error(`${chatgpt_output_filename} already exists`);
  }
}

module.exports = { createDirIfNotExists };
