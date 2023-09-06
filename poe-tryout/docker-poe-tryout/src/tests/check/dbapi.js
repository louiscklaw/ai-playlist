const fetch = require('node-fetch');
const chalk = require('chalk');

module.exports = async () => {
  var response, res_text;
  try {
    response = await fetch(`http://dbapi:3001/helloworld`);
    res_text = await response.text();
    if (res_text == 'dbapi, Hello World!') {
      console.log('dbapi'.padEnd(30, ' ') + chalk.green('ON-LINE...'));
    } else {
      throw new Error('cannot connect');
    }
  } catch (error) {
    console.log('dbapi'.padEnd(30, ' ') + chalk.red('FAILED !'));
  }
};
