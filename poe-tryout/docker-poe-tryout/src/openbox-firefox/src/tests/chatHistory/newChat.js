const { helloworld, newChat } = require("../../utils/chatHistory");

// newLog('hello comment', 'info')
//   .then(res => console.log('logging done'))
//   .catch(err => console.log('error', err));

newChat()
  .then(res => res.json())
  .then(res_json => {
    console.log(res_json._id);
    console.log('init chat done');
  })
  .catch(err => console.log('error', err));

// helloworld();
