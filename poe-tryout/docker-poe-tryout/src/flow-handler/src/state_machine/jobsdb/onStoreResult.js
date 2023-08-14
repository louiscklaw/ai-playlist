const { myLogger } = require('../../utils/myLogger');
const {storeJson} = require('../../utils/storeJson');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');


module.exports = {
  onStoreResult: function () {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info('store json result...');
        const {working_dir} = this.context;
        myLogger.info(working_dir);

        await createDirIfNotExists(working_dir);
        await storeJson(`${working_dir}/store_result.json`, this.context);

        res();
      } catch (error) {
        myLogger.error('error during saving result...');
        console.log(error)

        rej();
      }
    });
  },
};
