const fetch = require('node-fetch');

function askPoeWithMd(payload) {
  // NOTE: exception throw outside directly
  // NOTE: expected response -> {"state":"state_scheduled","err_msg":{}}
  // return new Promise((res, rej) =>{
  //   res({json: () => {
  //     return {"state":"state_scheduled","err_msg":{}}
  //   }})
  // })

  return fetch('http://poe-scheduler-api:3002/ask_poe_parse_md', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

module.exports = { askPoeWithMd };
