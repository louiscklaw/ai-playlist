const fetch = require('node-fetch');
const { myLogger } = require('../../utils/myLogger');

(async () => {
  const response = await fetch('http://dbapi:3001/PoeSeatStatus/getStatus/hello_poe_host', {
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
