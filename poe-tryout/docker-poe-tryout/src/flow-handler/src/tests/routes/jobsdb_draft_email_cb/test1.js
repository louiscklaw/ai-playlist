const fs = require('fs');
const { checkInput } = require('./checkInput');
var temp = fs.readFileSync('./400_draft_email.json', { encoding: 'utf8' });

var temp_json = JSON.parse(temp);
try {
  checkInput(temp_json);

  var email_content = temp_json.chat_history.q_and_a.history[0].answer;

  fs.writeFileSync('./test.md', email_content, { encoding: 'utf8' });

  console.log('done');
} catch (error) {
  console.log(error);
}
