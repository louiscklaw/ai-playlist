// TEST: src/page-handler/src/tests/telegramSendMessage/index.js

function postTelegramMessage(text) {
  return fetch('http://page-handler:3000/post-telegram-message', {
    method: 'post',
    body: JSON.stringify({ text }),
    headers: { 'content-type': 'application/json' },
  });
}

module.exports = { postTelegramMessage };
