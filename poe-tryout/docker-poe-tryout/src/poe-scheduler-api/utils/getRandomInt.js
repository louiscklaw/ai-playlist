function getRandomInt(max, min) {
  var result = Math.floor(Math.random() * max + min);
  // myLogger.info("%o", { result })
  return result;
}

module.exports = { getRandomInt };
