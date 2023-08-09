// 'use strict'

const fetch = require('node-fetch');

(async () => {
  var hello_result = await fetch('http://localhost:3000/hello', {
    method: 'get',
  });

  var hello_result_text = await hello_result.text();

  console.log(hello_result_text);
  console.log('hello get request');
})();
