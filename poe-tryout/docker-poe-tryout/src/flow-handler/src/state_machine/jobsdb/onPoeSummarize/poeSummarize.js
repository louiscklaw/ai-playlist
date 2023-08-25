const ERROR_LOG_DIR = `/logs/error/poeSummarize`;
const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');
const { calculateMD5 } = require('../../../utils/calculateMD5');
// const { postHelloworld } = require('../../../fetch/postHelloworld');
const { loadJson } = require('../../../utils/loadJson');
const { myLogger } = require('../../../utils/myLogger');
const { getWorkingDirFromPayload } = require('./getWorkingDirFromPayload');

module.exports = {
  poeSummarize: function () {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info('I Summarize');
        const { req_body } = this.context;
        var payload = req_body;
        // var { working_dir } = payload;
        var working_dir = await getWorkingDirFromPayload(payload);

        myLogger.info('input to summarize');

        var meta_json = await loadJson(`${working_dir}/meta.json`);
        myLogger.info('%o', { meta_json });

        // receiver -> src/poe-scheduler-api/routes/ask_poe.js
        var result = await askPoePrepromptQuestion(payload);

        res();
      } catch (error) {
        await createDirIfNotExists(ERROR_LOG_DIR);
        var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
        var payload = this.context;

        fs.writeFileSync(filename, JSON.stringify({ payload, error }), { encoding: 'utf8' });

        myLogger.error('error during Summarize');
        myLogger.error('%o', error);

        rej();
      }
    });
  },
};
