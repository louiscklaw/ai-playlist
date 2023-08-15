const { assert } = require('chai');
const useProxy = require('puppeteer-page-proxy');

const { initBrowser } = require('../utils/initBrowser');

async function mySleep(time_ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time_ms);
  });
}

async function getIpWithProxy() {
  try {
    const browser_with_proxy = await initBrowser();
    const page = (await browser_with_proxy.pages())[0];

    await page.setRequestInterception(true);
    page.on('request', async request => {
      await useProxy(request, 'http://v2raya:20172');
    });

    await page.goto('http://ifconfig.me', { waitUntil: 'load' });
    var proxied_ip_address = await page.evaluate(() => {
      return document.querySelector('#ip_address').textContent;
    });

    await page.waitForTimeout(3 * 1000);

    await browser_with_proxy.close();

    console.log(`proxied ip address ${proxied_ip_address}`);
    return proxied_ip_address;
  } catch (error) {
    console.log('error during getting ip with proxy');
    console.log(error);
  }
}

async function getMyIp() {
  try {
    // not proxied_ip_address
    const browser = await initBrowser();
    const page = (await browser.pages())[0];

    await page.goto('http://ifconfig.me');
    var ip_address = await page.evaluate(() => {
      return document.querySelector('#ip_address').textContent;
    });

    await browser.close();

    console.log(`my ip address: ${ip_address}`);
    return ip_address;
  } catch (error) {
    console.log('error during getting my id');
    console.log(error);
  }
}

async function checkIpLeaking() {
  try {
    const my_ip_addess = await getMyIp();
    await mySleep(5000);
    const proxied_ip = await getIpWithProxy();

    // assert(proxied_ip != my_ip_addess, 'real ip address leaking');
  } catch (error) {
    console.log('error during checking my ip leakage');
    console.log(error);
    throw new Error('error during checking my ip leakage');
  }
}

module.exports = { checkIpLeaking };
