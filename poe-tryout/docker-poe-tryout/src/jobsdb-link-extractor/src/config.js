const SRC_ROOT = __dirname;
const SHARE_ROOT = '/share';
const BROWSERLESS_HOST = 'link-extractor-chrome';
const SCREENSHOT_ROOT = '/share/screenshot';

const { PLAYWRIGHT_DRIVER_URL } = process.env;

if (!PLAYWRIGHT_DRIVER_URL) {
  throw new Error('PLAYWRIGHT_DRIVER_URL not set');
}

module.exports = {
  SRC_ROOT,
  SHARE_ROOT,
  BROWSERLESS_HOST,
  SCREENSHOT_ROOT,
  PLAYWRIGHT_DRIVER_URL,
};
