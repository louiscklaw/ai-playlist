const fetch = require('node-fetch');
const chalk = require('chalk');

(async () =>{
    var response, res_text;
    response = await fetch(`http://diff-handler:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'diff-handler, Hello World!') {
        console.log('diff-handler'.padEnd(30,' ') + chalk.green('ON-LINE...'));
    }else {
        console.log('diff-handler'.padEnd(30,' ') + chalk.red('FAILED !'));
    }

    response = await fetch(`http://flow-handler:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'flow-handler, Hello World!') {
        console.log('flow-handler'.padEnd(30,' ') + chalk.green('ON-LINE...'));
    }else {
        console.log('flow-handler'.padEnd(30,' ') + chalk.red('FAILED !'));
    }

    response = await fetch(`http://dbapi:3001/helloworld`);
    res_text = await response.text();
    if (res_text == 'dbapi, Hello World!') {
        console.log('dbapi'.padEnd(30,' ') + chalk.green('ON-LINE...'));
    }else {
        console.log('dbapi'.padEnd(30,' ') + chalk.red('FAILED !'));
    }

    response = await fetch(`http://poe-scheduler-api:3002/helloworld`);
    res_text = await response.text();
    if (res_text == 'poe-scheduler-api, Hello World!') {
        console.log('poe-scheduler-api'.padEnd(30,' ') + chalk.green('ON-LINE...'));
    }else {
        console.log('poe-scheduler-api'.padEnd(30,' ') + chalk.red('FAILED !'));
    }

    response = await fetch(`http://jobsdb-link-extractor:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'jobsdb-link-extractor, Hello World!') {
        console.log('jobsdb-link-extractor'.padEnd(30,' ') + chalk.green('ON-LINE...'));
    }else {
        console.log('jobsdb-link-extractor'.padEnd(30,' ') + chalk.red('FAILED !'));
    }

    response = await fetch(`http://jobsdb-scraper:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'jobsdb-scraper, Hello World!') {
        console.log('jobsdb-scraper'.padEnd(30,' ') + chalk.green('ON-LINE...'));
    }else {
        console.log('jobsdb-scraper'.padEnd(30,' ') + chalk.red('FAILED !'));
    }

    response = await fetch(`http://page-handler:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'page-handler, Hello World!') {
        console.log('page-handler'.padEnd(30,' ') + chalk.green('ON-LINE...'));
    }else {
        console.log('page-handler'.padEnd(30,' ') + chalk.red('FAILED !'));
    }

    response = await fetch(`http://openbox-poe-seat1:3000/helloworld`);
    res_text = await response.text();
    if (res_text == 'openbox-poe-seat, Hello World!') {
        console.log('openbox-poe-seat1'.padEnd(30,' ') + chalk.green('ON-LINE...'));
    }else {
        console.log('openbox-poe-seat1'.padEnd(30,' ') + chalk.red('FAILED !'));
    }

})();
