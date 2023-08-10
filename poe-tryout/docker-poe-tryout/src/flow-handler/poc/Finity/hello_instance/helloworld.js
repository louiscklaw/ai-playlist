const Finity = require('finity');

const {worker_config} = require('./lib')

const taskParams = {
  foo: 'bar',
};

const firstInstance = Finity.start(worker_config);
const secondInstance = Finity.start(worker_config);

firstInstance.handle('task_submitted', taskParams);
secondInstance.handle('task_submitted', {foo:'helloworld'});
