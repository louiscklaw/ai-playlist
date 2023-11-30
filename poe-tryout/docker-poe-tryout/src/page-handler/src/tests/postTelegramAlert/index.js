const fetch = require('node-fetch');

const { myLogger } = require('../../utils/myLogger');

var message =
  '🔔🔔🔔 something wrong  🔔🔔🔔\n' +
  'poe seat down\n';

const payload = {
  text: message,
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`post-telegram-message page-handler ${i}...`);

    const response = await fetch('http://page-handler:3000/post-telegram-alert', {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'content-type': 'application/json' },
    });

    try {
      const res_json = await response.json();
      myLogger.info('%o', { res_json });
      
    } catch (error) {
      const res_text = await response.text();
      myLogger.info(res_text)
    }
  });
