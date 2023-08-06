const { newLog } = require('../../utils/logs');

newLog('hello comment', 'info')
  .then(res => console.log('logging done'))
  .catch(err => console.log('error', err));
