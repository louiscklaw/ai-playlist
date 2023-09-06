// const fetch = require('node-fetch');
const rp = require("request-promise");

(async () => {
  // https://hk.jobsdb.com/hk/search-jobs/validation-automation-engineer/1
  var options = {
    method: "POST",
    uri: `http://jobsdb-scraper:3000/fetchSearchResult/search`,
    body: { search: ["validation", "automation", "engineer"] },
    json: true,
  };

  result = await rp(options);
  console.log({ result });
})();

// const SEARCH_URL = 'http://jobsdb-scraper:3000/fetchSearchResult/search?s=validation';

// Array(1)
//   .fill(0)
//   .forEach(async (v, i) => {
//     console.log(`posting ask ${i}...`);

//     const response = await fetch(SEARCH_URL);

//     const res_text = await response.text();
//     console.log({ res_text });
//   });

// const HELLOWORLD_URL = 'http://jobsdb-scraper:3000/fetchSearchResult/helloworld';

// Array(1)
//   .fill(0)
//   .forEach(async (v, i) => {
//     console.log(`posting ask ${i}...`);

//     const response = await fetch(HELLOWORLD_URL);

//     const res_text = await response.text();
//     console.log({ res_text });
//   });
