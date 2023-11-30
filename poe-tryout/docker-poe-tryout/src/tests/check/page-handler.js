const fetch = require('node-fetch');
const chalk = require('chalk');

module.exports = async () => {
  var response, res_text;
  try {
    response = await fetch(`http://page-handler:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'page-handler, Hello World!') {
      console.log('page-handler'.padEnd(30, ' ') + chalk.green('ON-LINE...'));
    } else {
      throw new Error('cannot connect');
    }
  } catch (error) {
    console.log('page-handler'.padEnd(30, ' ') + chalk.red('FAILED !'));
  }
};
