const test_markdown_content = `
# louis supermarket

## louis is selling

  - 10 x apples
  - 30 x oranges

## address:
  - branch 1
    - Hong Kong
  - branch 2
    - Japan
`;

const TASK_DESCRIPTION = () =>
  `
Please,
you will understand and summarize the text I inputted.
`.trim();

module.exports = {
  test_markdown_content,
  TASK_DESCRIPTION,
};
