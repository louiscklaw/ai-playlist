const fs = require('fs');

const { myLogger } = require('./myLogger');

async function storeJson(filepath, json) {
  try {
    myLogger.info(`writing json file to ${filepath}`);
    await fs.writeFileSync(filepath, JSON.stringify(json, null, 2), {
      encoding: 'utf-8',
    });
  } catch (error) {
    myLogger.error('error during storeJson');
    myLogger.error("%o",error);
  }
}

module.exports = { storeJson };
