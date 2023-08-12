const fetch = require('node-fetch');

function askPoePrepromptQuestion(payload) {
  // NOTE: expected response -> {"state":"state_scheduled","err_msg":{}} 
  // return new Promise((res, rej) =>{
  //   res({json: () => {
  //     return {"state":"state_scheduled","err_msg":{}}
  //   }})
  // })

  return fetch('http://poe-scheduler-api:3002/ask_poe', {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
}

module.exports = { askPoePrepromptQuestion };
