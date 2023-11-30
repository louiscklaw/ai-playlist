// const fetch = require('node-fetch');
const rp = require("request-promise");

(async () => {
  var options = {
    method: "GET",
    uri: `http://localhost:3021/helloworld`,

  };
  result = await rp(options);
  console.log({ result });
  console.log("done")
})();
