const fetch = require('node-fetch');

const payload = {
  text: 'blablabla',
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`post-telegram-message page-handler ${i}...`);

    const response = await fetch('http://page-handler:3000/post-telegram-message',{
      method:'post',
      body: JSON.stringify(payload),
      headers: {'content-type': 'application/json'}
    });

    const res_json = await response.json();
    console.log({ res_json });
  });
