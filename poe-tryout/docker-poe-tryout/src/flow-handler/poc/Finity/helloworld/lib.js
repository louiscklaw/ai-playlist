const Finity = require('finity');


function processTaskAsync(taskParams) {
  console.log('Processing task:', taskParams);
  // Simulate an async operation
  return new Promise(resolve => setTimeout(resolve(taskParams + 1), 100));
}


const worker = Finity.configure()
  .initialState('ready')
  .on('task_submitted')
  .transitionTo('running')
  .state('running')
  .do((state, context) => processTaskAsync(1))
  .onSuccess()
  .transitionTo('succeeded1')
  .onFailure()
  .transitionTo('failed')
  .onTimeout(1000)
  .transitionTo('timed_out')
  .state('succeeded1')
  .do((state, context) => processTaskAsync(context.result))
  .onSuccess()
  .transitionTo('succeeded2')
  .onFailure()
  .transitionTo('succeeded1')
  .onTimeout(1000)
  .transitionTo('timed_out')

  .global()
  .onStateEnter((state, context) => {
    console.log(`Entering state '${state}'`);
  })
  .getConfig();

// const taskParams = {
//   foo: 'bar',
// };
// worker.handle('task_submitted', taskParams);

module.exports = {
  worker
}