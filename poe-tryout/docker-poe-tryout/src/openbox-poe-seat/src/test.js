const { initBrowser } = require('./utils/initBrowser');

const useProxy = require('puppeteer-page-proxy');


(async () =>{
  const browser = await initBrowser();
  const page = (await browser.pages())[0];

  await page.setRequestInterception(true);
  page.on('request', async request => {
    await useProxy(request, 'https://159.223.183.111:80');
  });

  await page.goto('https://ifconfig.me');
  var ip_address = await page.evaluate(() => {
    return document.querySelector('#ip_address').textContent;
  });

  console.log({ip_address});

  await page.waitForTimeout(999*1000);
})();

console.log('helloworld test.js')