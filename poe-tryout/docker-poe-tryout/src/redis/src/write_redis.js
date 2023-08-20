const redis = require('redis');

const client = redis.createClient({
  url: 'redis://redis:6379',
});

client.on('connect', () => {
  console.log('connected to redis');
  console.log('write test start');
  Array(5)
    .fill(0)
    .forEach((_, j) => {
      Array(99)
        .fill(0)
        .forEach((_, i) => {
          var name = i.toString();
          var value = (i + i).toString();
          client
            .set(name, value)
            .then(res => {
              // console.log('write done')
              // console.log('res: ', res);
            })
            .catch(err => {
              console.log('err: ', err);
            });
        });

      console.log('write test done');

      Array(99)
        .fill(0)
        .forEach((_, i) => {
          var name = i.toString();
          client.get(name);
        });

      console.log('read test done');

      console.log('test done:' + j);
    });
});

client.on('error', err => {
  console.log('error: ', err);
});

client.connect();

console.log('done');
