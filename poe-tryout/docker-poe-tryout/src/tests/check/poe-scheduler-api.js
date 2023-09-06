const fetch = require('node-fetch');
const chalk = require('chalk');

module.exports = async () => {
  var response, res_text;
  try {
    response = await fetch(`http://poe-scheduler-api:3002/helloworld`);
    res_text = await response.text();
    if (res_text == 'poe-scheduler-api, Hello World!') {
      console.log('poe-scheduler-api'.padEnd(30, ' ') + chalk.green('ON-LINE...'));
    } else {
      throw new Error('cannot connect');
    }
  } catch (error) {
    console.log('poe-scheduler-api'.padEnd(30, ' ') + chalk.red('FAILED !'));
  }
};
