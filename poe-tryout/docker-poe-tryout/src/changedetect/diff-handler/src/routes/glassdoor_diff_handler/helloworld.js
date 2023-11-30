const { createClient } = require('redis');

const {  REDIS_ENDPOINT_URI } = require('../../config');

module.exports = router => {
  router.get('/helloworld', (req, res) => {
    var output = {};
    try {
      const client = createClient({
        url: REDIS_ENDPOINT_URI,
      });

      client.on('error', err => {
        throw err;
      });
      // used to initialize connection

      client.connect();

      client.disconnect();

      output = {...output, hello: 'world' };
      
    } catch (error) {
      output = {...output, hello: error.message };

    }
    res.send(output)
  });
};
