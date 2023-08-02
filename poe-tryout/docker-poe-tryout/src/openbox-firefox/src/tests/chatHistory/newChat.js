const { helloworld, newChat, appendChat } = require("../../utils/chatHistory");

// newLog('hello comment', 'info')
//   .then(res => console.log('logging done'))
//   .catch(err => console.log('error', err));

// appendChat('id', { Q: 'hello question', A: "hello answer" });

newChat()
  .then(res => res.json())
  .then(res_json => {
    console.log(res_json);
    console.log('init chat done');
    return res_json._id;
  })
  .then(async (id) => {
    await appendChat(id, { Q: 'hello question', A: "hello answer" });
    return id
  })
  .then(async (id) => {
    await appendChat(id, { Q: 'hello question', A: "hello answer" });
    return id
  })
  .catch(err => console.log('error', err));

// helloworld();
