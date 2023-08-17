function htmlToMarkdown(html_string) {
  try {
    var output = html_string
      .replace(/\\"/g, '"')
      .replace(/class=".+?"/g, '')
      .replace(/ >/g, '>')
      .replace(/style=".+?"/g, '')
      .replace(/class=".+?"/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/<br>/g, '')
      .replace(/\/?div/g, '')
      .replace(/\/?span/g, '')
      .replace(/\/?strong/g, '')
      .replace(/< >/g, '<>')
      .replace(/<>/g, '');

    output = output
      .replace(/ +\<h1\>(.*?)\<\/h1\>/g, '# $1')
      .replace(/.+\<h2\>(.*?)\<\/h2\>/g, '## $1')
      .replace(/.+\<h3\>(.*?)\<\/h3\>/g, '### $1')
      .replace(/.+\<h4\>(.*?)\<\/h4\>/g, '#### $1')
      .replace(/.+\<h5\>(.*?)\<\/h5\>/g, '##### $1')
      // .replace(/.+\<p\>(.*?)\<\/p\>/g,'\n$1\n')
      .replace(/<ul>/g, '\n\n')
      .replace(/<\/ul>/g, '\n\n')
      .replace(/<li>/g, '\n\n<li>')
      .replace(/<\/li>/g, '</li>\n\n')
      .replace(/\<li\> *(.*?) *\<\/li\>/g, '- $1');

    output = output
      .replace(/^ +$/gm, '')
      .replace(/\n\n\n+/g, '\n\n')
      .trim();

    return output;
  } catch (error) {
    console.log(error);
  }
}

// const doc = fs.readFileSync('example.html', {encoding: 'utf8'})
// const parsed_doc = parse(doc).querySelector('div').innerHTML

// const md = htmlToMarkdown(parsed_doc)

// fs.writeFileSync('example.md', md, {encoding:'utf8'})

module.exports = { htmlToMarkdown };
