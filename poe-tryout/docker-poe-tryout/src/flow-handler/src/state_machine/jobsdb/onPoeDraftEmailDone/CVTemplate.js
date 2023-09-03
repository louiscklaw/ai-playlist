const CVTemplate = json_input => {
  console.log(json_input);
  json_input = json_input ||'';

  return (
    `
## CV / Resume

${json_input}

homepage: https://louiscklaw.github.io
source: https://github.com/louiscklaw/ai-playlist

`.trim() + '\n'
  );
};

module.exports = { CVTemplate };
