const fetch = require('node-fetch');
const chalk = require('chalk');

module.exports = async () => {
  var response, res_text;

  try {
    response = await fetch(`http://diff-handler:3000/helloworld`, {timeout: 100});
    res_text = await response.text();
    if (res_text == 'diff-handler, Hello World!') {
      console.log('diff-handler'.padEnd(30, ' ') + chalk.green('ON-LINE...'));
    } else {
      throw new Error('cannot connect');
    }
  } catch (error) {
    console.log('diff-handler'.padEnd(30, ' ') + chalk.red('FAILED !'));
  }
};
