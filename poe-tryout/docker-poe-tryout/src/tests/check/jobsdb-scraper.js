const fetch = require('node-fetch');
const chalk = require('chalk');

module.exports = async () => {
  var response, res_text;
  try {
    response = await fetch(`http://jobsdb-scraper:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'jobsdb-scraper, Hello World!') {
      console.log('jobsdb-scraper'.padEnd(30, ' ') + chalk.green('ON-LINE...'));
    } else {
      throw new Error('cannot connect');
    }
  } catch (error) {
    console.log('jobsdb-scraper'.padEnd(30, ' ') + chalk.red('FAILED !'));
  }
};
