const fetch = require('node-fetch');

const body = {
  url: 'https://hk.jobsdb.com/hk/en/job/validation-assistant-100003010509868',
};

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://localhost:3003/jobsdbPostExtract', {
      method: 'post',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    const res_json = await response.json();
    const { extracted } = res_json;
    console.log({ extracted });
  });

console.log('helloworld');
