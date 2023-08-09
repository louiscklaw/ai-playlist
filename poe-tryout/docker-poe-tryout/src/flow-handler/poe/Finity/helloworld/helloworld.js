const Finity = require('finity');

const {worker} = require('./lib')

const taskParams = {
  foo: 'bar',
};

worker.handle('task_submitted', taskParams);
// worker.handle('task_submitted', {foo:'helloworld'});
