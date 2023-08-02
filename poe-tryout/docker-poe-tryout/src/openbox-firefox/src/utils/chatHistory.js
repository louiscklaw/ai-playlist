const fetch = require('node-fetch');

function chatHistory(session_id, comment, level = 'info') {
  const body = { level, comment };

  return fetch(
    'http://dbapi:3001/api/v1/Log',
    {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });
}

function newChat() {
  const comments = [];
  comments.push({ '_sys': 'new_chat_init' });
  const body = { level: 'info', comment: JSON.stringify(comments) };

  return fetch(
    'http://dbapi:3001/api/v1/Log',
    {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });
}

function helloworld() {
  var test = 'helloworld from chatHistory.js';
  console.log(test);
  return test;
}

module.exports = { helloworld, chatHistory, newChat }