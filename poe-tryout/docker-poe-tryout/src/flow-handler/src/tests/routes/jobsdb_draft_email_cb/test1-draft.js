const fs = require('fs');
const { checkInput } = require('./checkInput');
var temp = fs.readFileSync('./400_draft_email.json', { encoding: 'utf8' });

const fetch = require('node-fetch');

const payload_string = fs.readFileSync('./400_draft_email.json', { encoding: 'utf8' });

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`report-job-complete ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_draft_email_cb', {
      method: 'post',
      body: payload_string,
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.json());
  });

// var temp_json = JSON.parse(temp);
// try {

//     checkInput(temp_json)

//     var email_content = temp_json.chat_history.q_and_a.history[0].answer;

//     fs.writeFileSync('./test.md', email_content, { encoding: 'utf8' });

//     console.log('done')

// } catch (error) {

//     console.log(error)

// }
