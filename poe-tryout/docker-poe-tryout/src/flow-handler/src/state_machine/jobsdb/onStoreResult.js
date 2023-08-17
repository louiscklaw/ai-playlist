const { myLogger } = require('../../utils/myLogger');
const { storeJson } = require('../../utils/storeJson');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');

module.exports = {
  onStoreResult: function () {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info('store json result...');

        var { working_dir } = this.context;
        if (!working_dir) {
          myLogger.info('working_dir is not defined, default to /share/testing')
          working_dir = '/share/testing'
        };

        await createDirIfNotExists(working_dir);
        await storeJson(`${working_dir}/store_result.json`, this.context);

        res();
      } catch (error) {
        myLogger.error('error during saving result...');
        console.log(error);

        rej();
      }
    });
  },
};
