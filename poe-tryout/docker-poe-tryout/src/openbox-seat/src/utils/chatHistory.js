const fetch = require('node-fetch');

function chatHistory(session_id, comment, level = 'info') {
  const body = { level, comment };

  return fetch('http://dbapi:3001/api/v1/Log', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
}

function appendChat(_id, q_and_a) {
  return fetch(`http://dbapi:3001/api/v1/Log/${_id}`)
    .then(res => res.json())
    .then(res_json => {
      var temp_comment = JSON.parse(res_json['comment']);
      temp_comment.push(q_and_a);
      var body = { level: 'chat', comment: JSON.stringify(temp_comment) };

      return fetch(`http://dbapi:3001/api/v1/Log/${_id}`, {
        method: 'patch',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
    })
    .catch(err => console.log(err));
}

function newChat() {
  const comments = [];
  comments.push({ _sys: 'new_chat_init' });
  const test_a = [];
  const body = { level: 'chat', comment: JSON.stringify(test_a) };

  return fetch('http://dbapi:3001/api/v1/Log', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(res_json => {
      console.log(res_json);
      console.log('init chat done');
      return res_json._id;
    });
}

function helloworld() {
  var test = 'helloworld from chatHistory.js';
  console.log(test);
  return test;
}

module.exports = { helloworld, chatHistory, newChat, appendChat };
