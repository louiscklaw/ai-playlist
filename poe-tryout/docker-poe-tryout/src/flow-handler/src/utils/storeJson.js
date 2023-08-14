const fs = require('fs');

const { myLogger } = require('./myLogger');

module.exports = {
  storeJson: async (filepath, json) => {
    try {
      console.log(`writing json file to ${filepath}`);
      await fs.writeFileSync(filepath, JSON.stringify(json, null, 2), {
        encoding: 'utf-8',
      });
    } catch (error) {
      myLogger.error('error during storeJson');
      console.log(error);
    }
  },
};
