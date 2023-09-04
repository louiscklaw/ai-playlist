const fs = require('fs');
const path = require('path');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');
const { calculateMD5 } = require('../../../utils/calculateMD5');
// const { postHelloworld } = require('../../../fetch/postHelloworld');
const { loadJson } = require('../../../utils/loadJson');
const { myLogger } = require('../../../utils/myLogger');
const { getWorkingDirFromPayload } = require('./getWorkingDirFromPayload');

module.exports = {
  poeSummarize: function () {
    return new Promise(async (res, rej) => {
      var output = { state: 'init', debug: this.context, error: '' };

      try {
        myLogger.info('I Summarize');
        const { req_body } = this.context;
        var payload = req_body;
        // var { working_dir } = payload;
        var working_dir = await getWorkingDirFromPayload(payload);

        myLogger.info('input to summarize');

        var meta_json = await loadJson(`${working_dir}/meta.json`);
        myLogger.info(JSON.stringify(meta_json));

        // receiver -> src/poe-scheduler-api/routes/ask_poe.js
        var result = await askPoePrepromptQuestion(payload);

        res();
      } catch (error) {
        output = { ...output, state: 'error', error: JSON.stringify(error) };

        await createDirIfNotExists(ERROR_LOG_DIR);

        var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
        fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

        myLogger.error('error during Summarize');
        myLogger.error(JSON.stringify(error));

        rej();
      }
    });
  },
};
