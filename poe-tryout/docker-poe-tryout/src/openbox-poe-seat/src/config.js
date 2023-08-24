const path = require('path');
const { myLogger } = require('./utils/myLogger');

const SRC_ROOT = path.resolve(__dirname);
const UTILS_ROOT = path.resolve([SRC_ROOT, 'utils'].join('/'));
const PROMPT_ROOT = path.resolve([SRC_ROOT, 'prompt'].join('/'));
const ERROR_ROOT = path.resolve([SRC_ROOT, 'error'].join('/'));
const ROUTES_ROOT = path.resolve([SRC_ROOT, 'routes'].join('/'));
const WORKER_ROOT = path.resolve([SRC_ROOT, 'worker'].join('/'));

const {
  FLOW_HANDLER_ENDPOINT,
  API_DEBUG_ENDPOINT,
  BAIT_ENDPOINT,
  DBAPI_ENDPOINT,
  DIFF_HANDLER_ENDPOINT,
  JOBSDB_LINK_EXTRACTOR_ENDPOINT,
  PAGE_HANDLER_ENDPOINT,
  POE_SCHEDULER_API_ENDPOINT,
  OPENBOX_POE_SEAT1_ENDPOINT,
  OPENBOX_POE_SEAT2_ENDPOINT,
  CANONICAL_HOSTNAME
} = process.env;

if (!CANONICAL_HOSTNAME) {
  myLogger.error('CANONICAL_HOSTNAME not defined !!')
  throw new Error('CANONICAL_HOSTNAME not defined !!')
}

if (!DBAPI_ENDPOINT) {
  myLogger.error('DBAPI_ENDPOINT not defined !!')
  throw new Error('DBAPI_ENDPOINT not defined !!')
}

module.exports = {
  SRC_ROOT,
  UTILS_ROOT,
  PROMPT_ROOT,
  ERROR_ROOT,
  ROUTES_ROOT,
  WORKER_ROOT,

  FLOW_HANDLER_ENDPOINT,
  API_DEBUG_ENDPOINT,
  BAIT_ENDPOINT,
  DBAPI_ENDPOINT,
  DIFF_HANDLER_ENDPOINT,
  JOBSDB_LINK_EXTRACTOR_ENDPOINT,
  PAGE_HANDLER_ENDPOINT,
  POE_SCHEDULER_API_ENDPOINT,
  OPENBOX_POE_SEAT1_ENDPOINT,
  OPENBOX_POE_SEAT2_ENDPOINT,

  CANONICAL_HOSTNAME
};
