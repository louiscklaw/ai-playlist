const fs = require('fs');
const { getAddedLink } = require('./getAddedLink');
const test_json = fs.readFileSync('./test.json', { encoding: 'utf8' });
const testJson = JSON.parse(test_json);

const { req_body } = testJson;
const { message } = req_body;

console.log(getAddedLink(message));
