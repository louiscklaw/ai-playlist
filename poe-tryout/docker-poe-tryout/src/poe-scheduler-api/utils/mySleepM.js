function mySleepM(time_m) {
  return new Promise(resolve => setTimeout(resolve, time_m * 60 * 1000));
}

module.exports = { mySleepM };
