const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

(async () => {
  const response = await fetch('http://localhost:3001/api/v1/Customer/64c9beba5dc9292b6471f638', {
    method: 'delete',
  });

  // NOTE: if response.status == 204 means success
  myLogger.info(response.status);
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
