const fetch = require('node-fetch');

// NOTE: simulate the response from poe-scheduler
const url = 'http://flow-handler:3000/jobsdb_flow_summarize'
const payload ={
  hello:'world'
}

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch(url, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.text())

    // const res_json = await response.json();
    // console.log({ res_json });
    console.log('helloworld')
  });

console.log('done');
