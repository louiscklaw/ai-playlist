const fs = require('fs');

const { myLogger } = require('../../utils/myLogger');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');
// const { askPoePrepromptQuestion } = require('../../fetch/askPoePrepromptQuestion');
// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

async function storeJson(filepath, json) {
  try {
    await fs.writeFileSync(filepath, JSON.stringify(json, null, 2), {
      encoding: 'utf-8',
    });
  } catch (error) {
    myLogger.error('error during storeJson');
    myLogger.error(error);
  }
}

module.exports = {
  onStoreResult: function () {
    return new Promise(async (res, rej) => {
      try {
        const working_dir = '/share/helloworld';

        myLogger.info('store json result...');
        myLogger.info(working_dir);

        await createDirIfNotExists(working_dir);
        await storeJson(`${working_dir}/hello.json`, this.context);

        res();
      } catch (error) {
        myLogger.error('error during saving result...');
        myLogger.error(error);

        rej();
      }
    });
  },
};
