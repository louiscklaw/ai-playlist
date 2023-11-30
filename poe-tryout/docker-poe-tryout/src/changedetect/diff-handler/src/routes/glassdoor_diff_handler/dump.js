const { INIT, DONE, ERROR } = require('../../constants');
const { myLogger } = require('../../utils/myLogger');

module.exports = router => {
  router.post('/dump', (req, res) => {
    var output = { state: INIT, debug: {}, error: '' };
    myLogger.info('dump called');

    try {
      var req_body = req.body;
      
      myLogger.info(JSON.stringify(req_body));

      output = { ...output, state: DONE, debug: req_body };
    } catch (error) {
      myLogger.error('error occur in diff-handler');
      myLogger.error(JSON.stringify(error));
      output = { ...output, state: ERROR, error: error.message };
    }

    res.send(output);
  });
};
