// https://florianholzapfel.github.io/express-restify-mongoose/

var rp = require('request-promise');
const { myLogger } = require('../../utils/myLogger');

(async () => {
  myLogger.info('helloworld');
  const id = `64df268c54d0ffb4ccd493f1`;

  var options;

  options = {
    method: 'GET',
    uri: `http://dbapi:3001/Customer/addCount/${id}`,
  };

  // const resp = await rp(options);

  Array(100)
    .fill(0)
    .map(async (_, i) => {
      rp(options);
      rp(options);
    });

  // myLogger.info(resp)
})();
