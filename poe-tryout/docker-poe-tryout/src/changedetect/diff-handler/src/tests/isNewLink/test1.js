const { createClient } = require('redis');
const { isNewLink } = require('../../utils/isNewLink');
const { getRandomInt } = require('../../utils/getRandomInt');

const client = createClient({
  url: 'redis://:123456@diff-handler-redis:6379',
});

client.on('error', err => console.log('Redis Client Error', err));

async function filterAleadySeenLink(links, client) {
  var output = [];

  for (var i = 0; i < links.length; i++) {
    var x = links[i].toString();
    if (await isNewLink(x, client)) {
      output.push(x);
    } else {
      console.log(`already seen, skipping ${x}`);
    }
  }

  return output;
}

(async () => {
  await client.connect();

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
  output = await filterAleadySeenLink(input, client);
  console.log(output);

  await client.disconnect();
})();
