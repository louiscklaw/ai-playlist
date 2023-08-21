const { loadJson } = require("../../utils/loadJson");

(async()=>{
  console.log(await loadJson('./helloworld.json'))
})();