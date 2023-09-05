const fs = require('fs');
const path = require('path');
const ERROR_LOG_DIR = `/logs/error/${path.basename(__filename).replace('.js', '')}`;

// TODO: remove me
// const { askPoePrepromptQuestion } = require('../../../fetch/askPoePrepromptQuestion');

const { myLogger } = require('../../../utils/myLogger');
const { createDirIfNotExists } = require('../../../utils/createDirIfNotExists');
const { calculateMD5 } = require('../../../utils/calculateMD5');
const { askPoeWithMd } = require('../../../fetch/askPoeWithMd');

function onPoeDraftEmail() {
  return new Promise(async (res, rej) => {
    var output = { state: 'INIT', debug: this.context, error: '' };

    try {
      const { req_body } = this.context;
      var output = { ...output, state: 'INIT', debug: req_body };

      myLogger.info('I DraftEmail');
      var payload = req_body;

      // TODO: remove me
      // var result = await askPoePrepromptQuestion(payload);

      var result = await askPoeWithMd(payload);
      output = { ...output, state: 'done', result };

      // TODO: remove me
      // console.log(await result.text());
      // res_json = await result.json();

      res();
    } catch (error) {
      output = { ...output, state: 'error', error: JSON.stringify(error) };

      await createDirIfNotExists(ERROR_LOG_DIR);

      var filename = `${ERROR_LOG_DIR}/${calculateMD5(error)}.json`;
      myLogger.error(`saving error to ${filename}`);
      fs.writeFileSync(filename, JSON.stringify(output), { encoding: 'utf8' });

      myLogger.error('error during draft email');
      console.log(error);
    }
  });
}

module.exports = { onPoeDraftEmail };
