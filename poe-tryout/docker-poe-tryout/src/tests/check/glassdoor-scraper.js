const fetch = require('node-fetch');
const chalk = require('chalk');

module.exports = async () => {
  var response, res_text;

  try {
    response = await fetch(`http://glassdoor-scraper:3000/helloworld`, {timeout: 100});
    res_text = await response.text();
    if (res_text == 'glassdoor-scraper, Hello World!') {
      console.log('glassdoor-scraper'.padEnd(30, ' ') + chalk.green('ON-LINE...'));
    } else {
      throw new Error('cannot connect');
    }
  } catch (error) {
    console.log('glassdoor-scraper'.padEnd(30, ' ') + chalk.red('FAILED !'));
  }
};
