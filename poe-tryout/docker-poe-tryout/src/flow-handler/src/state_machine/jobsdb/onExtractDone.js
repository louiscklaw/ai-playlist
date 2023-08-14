module.exports = {
  onExtractDone: function () {
    return new Promise(async (res, rej) => {
      res();
    });
  },
};
