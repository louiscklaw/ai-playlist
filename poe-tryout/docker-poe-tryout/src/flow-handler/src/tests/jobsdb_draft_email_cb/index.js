const fetch = require('node-fetch');

// NOTE: expecting calling from poe-scheduler to flow-handler

Array(1)
  .fill(0)
  .forEach(async (v, i) => {
    console.log(`posting ask ${i}...`);

    const response = await fetch('http://flow-handler:3000/jobsdb_draft_email_cb', {
      method: 'post',
      body: JSON.stringify({
        state: 'draft_email_done',
        result: { hello: 'world', content: 'helloworld email content' },
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(await response.text());

    // const res_json = await response.json();
    // console.log({ res_json });
    console.log('helloworld');
  });

console.log('done');
