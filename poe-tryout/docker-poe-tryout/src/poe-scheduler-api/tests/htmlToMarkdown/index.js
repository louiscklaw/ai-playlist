const fs = require('fs');

const { htmlToMarkdown } = require('../../utils/htmlToMarkdown');

const doc = fs.readFileSync('example.html', { encoding: 'utf8' });

const md = htmlToMarkdown(doc);

fs.writeFileSync('example.md', md, { encoding: 'utf8' });
