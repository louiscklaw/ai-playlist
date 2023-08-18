const fetch = require('node-fetch');

async function delCustomer(id) {
  const response = await fetch(`http://dbapi:3001/api/v1/Customer/${id}`, {
    method: 'delete',
  });

  return response;
}

module.exports = { delCustomer };
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
