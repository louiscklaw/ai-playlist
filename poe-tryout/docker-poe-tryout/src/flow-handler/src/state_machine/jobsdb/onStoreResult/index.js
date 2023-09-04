const { myLogger } = require('../../../utils/myLogger');
const { storeJson } = require('../../../utils/storeJson');
const { loadJson } = require('../../../utils/loadJson');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');

module.exports = {
  onStoreResult: function () {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info('store json result...');

        var { working_dir } = this.context;
        if (!working_dir) {
          myLogger.info('working_dir is not defined, default to /share/testing');
          working_dir = '/share/testing';
        }

        var test_json = await loadJson(`${working_dir}/meta.json`);
        myLogger.info(`job url: ${test_json.jobsdb_job_url}`);

        await createDirIfNotExists(working_dir);
        await storeJson(`${working_dir}/999_store_result.json`, this.context);

        res();
      } catch (error) {
        myLogger.error('error during saving result...');
        myLogger.error(JSON.stringify(error));

        rej();
      }
    });
  },
};
