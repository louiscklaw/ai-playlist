const fetch = require('node-fetch');

const { myLogger } = require('./myLogger');

var poe_seat_down_message = host => {
  return {
    text: '🔔🔔🔔 something wrong  🔔🔔🔔\n' + `poe seat down \`${host}\`  \n`,
  };
};

async function poeSendAlert(content_o) {
  const response = await fetch('http://page-handler:3000/post-telegram-alert', {
    method: 'post',
    body: JSON.stringify(content_o),
    headers: { 'content-type': 'application/json' },
  });

  try {
    const res_json = await response.json();
    myLogger.info('%o', { res_json });
  } catch (error) {
    const res_text = await response.text();
    myLogger.info(res_text);
  }
}

function poeDownAlert(poe_host) {
  return poeSendAlert(poe_seat_down_message(poe_host));
}

module.exports = { poeDownAlert };
