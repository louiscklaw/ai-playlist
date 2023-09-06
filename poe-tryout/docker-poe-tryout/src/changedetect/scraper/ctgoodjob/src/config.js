const SRC_ROOT = __dirname;
const SHARE_ROOT = '/share';
const SCREENSHOT_ROOT = '/share/screenshot';

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
} = process.env;

module.exports = {
  SRC_ROOT,
  SHARE_ROOT,
  SCREENSHOT_ROOT,
  
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
};
