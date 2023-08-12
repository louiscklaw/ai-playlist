const fs = require('fs');

const { myLogger } = require('../../utils/myLogger');
const { createDirIfNotExists } = require('../../utils/createDirIfNotExists');
// const { askPoePrepromptQuestion } = require('../../fetch/askPoePrepromptQuestion');
// const { DRAFT_EMAIL_PREPROMPT } = require('./constants');

module.exports = {
  onStoreResult: function () {
    return new Promise(async (res, rej) => {
      try {
        myLogger.info( 'store json result' );

        await createDirIfNotExists('/share/helloworld');
        await fs.writeFileSync('/share/helloworld/hello.json', JSON.stringify(this.context, null, 2), { encoding: 'utf-8' });

        res();
      } catch (error) {
        myLogger.error( 'error during saving result' );
        
        rej();
      }
    });
  },
};
