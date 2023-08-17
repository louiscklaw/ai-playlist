const { myLogger } = require('../../utils/myLogger');
const { storeJson } = require('../../utils/storeJson');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');


function onReportJobComplete() {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info('report job complete...');
        const { working_dir } = this.context;
        myLogger.info(this.context);
        myLogger.info(working_dir);

        var message = `job email prepared in dir: ${working_dir}`;
        await postTelegramMessage(message)

        res();
      } catch (error) {
        myLogger.error('error during report job complete...');
        myLogger.error(error.message);

        rej();
      }
    });
  }


module.exports = {onReportJobComplete}