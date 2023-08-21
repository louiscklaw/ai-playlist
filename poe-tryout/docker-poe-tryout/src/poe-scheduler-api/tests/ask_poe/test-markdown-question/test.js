const fetch = require('node-fetch');
const fs = require('fs');
const { htmlToMarkdown } = require('../../../utils/htmlToMarkdown');
const { myLogger } = require('../../../utils/myLogger');

const doc = fs.readFileSync('example.html', { encoding: 'utf8' });

const markdown_content = htmlToMarkdown(doc);

const body = {
  preprompts: [
    'I will send you a mark down, please try to summarize it. please try to make your answer in less than 10 words.',
  ],
  question_list: [
    `
\`\`\`
${markdown_content}
\`\`\`
`,
  ],
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    myLogger.info(`posting ask ${i}...`);

    const response = await fetch('http://poe-scheduler-api:3002/ask_poe', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    myLogger.info('%o', { res_json });
  });
