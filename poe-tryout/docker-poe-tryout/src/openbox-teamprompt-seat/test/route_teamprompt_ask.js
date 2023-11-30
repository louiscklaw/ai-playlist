// const fetch = require('node-fetch');
const rp = require("request-promise");

(async () => {

  var options = {
    method: "POST",
    uri: `http://localhost:3021/teamprompt/ask`,
    body: { question: ["1+99"] },
    json: true,
  };

  result = await rp(options);
  console.log({ result });

})();
