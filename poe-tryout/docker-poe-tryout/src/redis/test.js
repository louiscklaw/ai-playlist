var redis = require('redis'); // 1

const client = redis.createClient({ host: 'redis' });

client.on('connect', () => {
  console.log('Connected to Redis');

  // Perform operations on Redis here

  Array(999)
    .fill(0)
    .forEach((_, i) => {
      console.log(i);
      client.set('message', 'Hello World', (error, result) => {
        if (error) {
          console.error(error);
        } else {
          console.log(`Set message: ${result}`);

          client.get('message', (error, reply) => {
            if (error) {
              console.error(error);
            } else {
              console.log(`Get message: ${reply}`);

              // Close the connection when done with operations
              client.quit();
            }
          });
        }
      });
    });
});

client.on('error', error => {
  console.error(`Error connecting to Redis: ${error}`);
});
