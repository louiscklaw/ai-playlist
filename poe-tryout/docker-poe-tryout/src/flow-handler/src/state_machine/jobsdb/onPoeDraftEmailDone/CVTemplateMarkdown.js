const CVTemplateMarkdown = content => {
  console.log(content);
  content = content ||'';

  return (
    `
## CV / Resume

${content}

homepage: https://louiscklaw.github.io
source: https://github.com/louiscklaw/ai-playlist

`.trim() + '\n'
  );
};

module.exports = { CVTemplateMarkdown };
