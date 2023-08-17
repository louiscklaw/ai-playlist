function mySleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { mySleep };
