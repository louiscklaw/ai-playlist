const ask = require('./utils/teamprompt');

(async () => {
  const result = await ask('hello');
  console.log(result);
})();
