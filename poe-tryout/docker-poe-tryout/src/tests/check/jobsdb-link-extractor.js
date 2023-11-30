const fetch = require('node-fetch');
const chalk = require('chalk');

module.exports = async () => {
  var response, res_text;
  try {
    response = await fetch(`http://jobsdb-link-extractor:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'jobsdb-link-extractor, Hello World!') {
      console.log('jobsdb-link-extractor'.padEnd(30, ' ') + chalk.green('ON-LINE...'));
    } else {
      throw new Error('cannot connect');
    }
  } catch (error) {
    console.log('jobsdb-link-extractor'.padEnd(30, ' ') + chalk.red('FAILED !'));
  }
};
