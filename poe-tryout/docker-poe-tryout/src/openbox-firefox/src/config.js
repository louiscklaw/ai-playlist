const path = require('path');

const SRC_ROOT = path.resolve(__dirname);
const UTILS_ROOT = path.resolve([SRC_ROOT, 'utils'].join('/'));
const PROMPT_ROOT = path.resolve([SRC_ROOT, 'prompt'].join('/'));
const ERROR_ROOT = path.resolve([SRC_ROOT, 'error'].join('/'));
const ROUTES_ROOT = path.resolve([SRC_ROOT, 'routes'].join('/'));
const WORKER_ROOT = path.resolve([SRC_ROOT, 'worker'].join('/'));

module.exports = {
  SRC_ROOT,
  UTILS_ROOT,
  PROMPT_ROOT,
  ERROR_ROOT,
  ROUTES_ROOT,
  WORKER_ROOT
};
