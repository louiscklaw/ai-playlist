const fetch = require('node-fetch');

const markdown_content = 
`
# Hi, i am louis
## This is the food i love:

- apple
- orange
- banana

## This is the food i hate:

- pear
- grape
`.trim()

const body = {
  preprompts: [
    "I will send you a mark down, please try to understand it. please try to make your answer in less than 10 words."
  ],
  question_list: [
`
\`\`\`
${markdown_content}
\`\`\`
`
  ],
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch(
      'http://poe-scheduler-api:3002/ask_poe', 
      {
        method: 'post',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const res_json = await response.json();
    console.log({ res_json });
  });
