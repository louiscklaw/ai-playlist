const { storeJson } = require('../../../utils/storeJson');

(async () => {
  await storeJson('./hello.json', { hello: 'world' });
})();
