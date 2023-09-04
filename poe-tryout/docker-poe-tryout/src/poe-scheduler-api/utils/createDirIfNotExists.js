const fs = require('fs');

async function createDirIfNotExists(chatgpt_output_filename) {
  try {
    await fs.mkdirSync(chatgpt_output_filename);
  } catch (error) {
    myLogger.info(`${chatgpt_output_filename} already exists`);
  }
}

module.exports = { createDirIfNotExists };
