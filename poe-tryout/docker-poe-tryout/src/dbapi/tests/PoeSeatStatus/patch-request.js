const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

(async () => {
  const body = { name: 'customer name', comment: 'customer comment updated' };

  const response = await fetch('http://localhost:3001/api/v1/Customer/64c9bf595dc9292b6471f63c', {
    method: 'patch',
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
