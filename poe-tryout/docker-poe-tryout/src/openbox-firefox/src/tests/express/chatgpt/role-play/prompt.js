const fs = require('fs');

const PREAMBLE = ``;
const END_WITH_YES = `If you understand, no need to reply me details. Reply me with "YES" only.`;

// init preset prompt
const preset_role_json = fs.readFileSync(`${__dirname}/preset_role.json`);
const preset_role = JSON.parse(preset_role_json);
var d_preset_role = {};
preset_role.forEach(v => {
  d_preset_role[v.act] = {
    prompt: v.prompt,
    source: 'from preset_role.json',
    hello: 'world',
  };
});

const helloworld_louis_paragraph = () =>
  `
\`\`\`
Send email to human resources department.
Subject: a letter of testing send email
content is about:
  - Louis is a boy.
  - Louis eat apple.
\`\`\`
`
    .trim()
    .replace(/\n/g, '');

// Act as a Spoken English Teacher and Improver
// https://github.com/f/awesome-chatgpt-prompts
const TASK_DESCRIPTION = () =>
  `
Please,
I want you to act as a spoken English teacher and improver. 
I will speak to you in English and you will reply to me in English to practice my spoken English. 
I want you to keep your reply neat, limiting the reply to 100 words. 
I want you to strictly correct my grammar mistakes, typos, and factual errors. 
I want you to ask me a question in your reply. 
Now let's start practicing, you could ask me a question first. 
Remember, I want you to strictly correct my grammar mistakes, typos, and factual errors.
`
    .trim()
    .replace(/\n/g, '');

function helloworld() {
  console.log('helloworld from prompt');
  return 'helloworld';
}

module.exports = {
  helloworld,
  TASK_DESCRIPTION,
  helloworld_louis_paragraph,
  d_preset_role,
};
