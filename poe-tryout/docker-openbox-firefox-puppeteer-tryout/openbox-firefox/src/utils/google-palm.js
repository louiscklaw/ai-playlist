var assert = require('chai').assert

async function initGooglePaLMPage(page) {
  await page.goto('https://poe.com/GooglePaLM');
  return 'init GooglePaLM page';
}

function helloworld(test_call = '') {
  console.log(test_call);
  console.log('helloworld from google-palm.js');
}

module.exports = {
  helloworld,
  initGooglePaLMPage
}
