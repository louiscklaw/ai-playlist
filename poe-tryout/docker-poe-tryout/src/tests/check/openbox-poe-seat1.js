const fetch = require('node-fetch');
const chalk = require('chalk');

module.exports = async () => {
  var response, res_text;
  try {
    response = await fetch(`http://openbox-poe-seat1:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'openbox-poe-seat1, Hello World!') {
      console.log('openbox-poe-seat1'.padEnd(30, ' ') + chalk.green('ON-LINE...'));
    } else {
      throw new Error('cannot connect');
    }
  } catch (error) {
    console.log('openbox-poe-seat1'.padEnd(30, ' ') + chalk.red('FAILED !'));
  }
};
