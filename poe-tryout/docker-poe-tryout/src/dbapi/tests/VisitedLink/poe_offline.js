const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

(async () => {
  const body = { name: 'customer name', comment: 'customer comment updated' };

  const response = await fetch('http://dbapi:3001/PoeSeatStatus/offline/hello_poe_host', {
    method: 'patch',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  try {
    const data = await response.json();
    console.log(data);

    myLogger.info(JSON.stringify(data));
  } catch (error) {
    myLogger.error(await response.text());
  }
})();
