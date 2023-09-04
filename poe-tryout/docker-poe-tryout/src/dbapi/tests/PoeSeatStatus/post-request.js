const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

(async () => {
  const body = { name: 'customer name' };

  const response = await fetch('http://dbapi:3001/api/v1/Helloworld', {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  myLogger.info(data);
})();

// request = require('request')

// function increaseCount(currentCount, resourceId, next) {
//   var options, patch;
//   patch = [
//     {
//       "op": "test",
//       "path": "/count",
//       "value": currentCount
//     }, {
//       "op": "replace",
//       "path": "/count",
//       "value": currentCount + 1
//     }
//   ];
//   options = {
//     method: 'PATCH',
//     uri: "/resource/" + resourceId,
//     body: patch,
//     json: true
//   };
//   return request(options, function (err, response, data) {
//     return next(data);
//   });
// }
