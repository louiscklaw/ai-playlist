const PREAMBLE = ``;
const END_WITH_YES = `If you understand, no need to reply me details. Reply me with "YES" only.`;

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

const TASK_DESCRIPTION = () =>
  `
Please,
you will understand and help me to draft a email to someone with the information I inputted.
`.trim();

function helloworld() {
  console.log('helloworld from prompt');
  return 'helloworld';
}

module.exports = {
  helloworld,
  TASK_DESCRIPTION,
  helloworld_louis_paragraph,
};
