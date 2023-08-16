const {parse} = require('node-html-parser')

function htmlToMarkdown(html_string){
  try {
    const parsed_html = parse(html_string)
      .querySelector('div').innerHTML

    var output = parsed_html
      .replace(/ +\<h1\>(.*?)\<\/h1\>/g,'# $1')
      .replace(/.+\<h2\>(.*?)\<\/h2\>/g,'## $1')
      .replace(/.+\<h3\>(.*?)\<\/h3\>/g,'### $1')
      .replace(/.+\<h4\>(.*?)\<\/h4\>/g,'#### $1')
      .replace(/.+\<h5\>(.*?)\<\/h5\>/g,'##### $1')
      .replace(/.+\<p\>(.*?)\<\/p\>/g,'\n$1\n')
      .replace(/.+\<ul\>((.|\n)*?)\<\/ul\>/g,'$1')
      .replace(/.+\<li\>[\n| ]*(.*?)[\n| ]*\<\/li\>/gm,'- $1')

    output = output
    .replace(/^ +$/gm,'')
      .replace(/\n\n\n+/g,'\n\n')
      .trim()

    return output
  } catch (error) {
    console.log(error)
  }
}


// const doc = fs.readFileSync('example.html', {encoding: 'utf8'})
// const parsed_doc = parse(doc).querySelector('div').innerHTML


// const md = htmlToMarkdown(parsed_doc)

// fs.writeFileSync('example.md', md, {encoding:'utf8'})

module.exports = {htmlToMarkdown}