const { createClient } = require('redis');
const { isNewLink } = require('../../utils/isNewLink');
const { getRandomInt } = require('../../utils/getRandomInt');

const client = createClient({
  url: 'redis://:123456@diff-handler-redis:6379',
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      // Connection refused error, wait and try reconnecting after 5 seconds
      return 5000;
    }
    
    // Retry immediately or after some delay depending on your requirements.
    // For example, return null to retry immediately or specify a delay in milliseconds.
    return null;
  },
});

client.on('error', err => console.log('Redis Client Error', err));

async function filterAlreadySeenLink(links, redis_client) {
  var output = [];

  for (var i = 0; i < links.length; i++) {
    var x = links[i].toString();
    if (await isNewLink(x, redis_client)) {
      output.push(x);
    } else {
      console.log(`already seen, skipping ${x}`);
    }
  }

  return output;
}

(async () => {
  await client.connect();
  if (client.sta)

  console.log(await isNewLink('1', client));
  console.log(await isNewLink('1', client));
  console.log(await isNewLink('1', client));

  console.log(await isNewLink(getRandomInt(99999999, 1).toString(), client));
  console.log(await isNewLink(getRandomInt(99999999, 1).toString(), client));
  console.log(await isNewLink(getRandomInt(99999999, 1).toString(), client));

  var input = ['1', '2', '3', '1', '1', '5', '6'];
  var output = [];
  // for (var i =0; i< input.length;i++){
  //   var x = input[i].toString()
  //   if (await isNewLink(x, client)){
  //     output.push(x)
  //   }else{
  //     console.log('already seen, skipping')
  //   }
  // }
  output = await filterAlreadySeenLink(input, client);
  console.log(output);

  await client.disconnect();
})();
