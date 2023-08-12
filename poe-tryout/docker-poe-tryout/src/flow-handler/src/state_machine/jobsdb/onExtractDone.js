module.exports = {
  onExtractDone: function () {
    return new Promise(async (res, rej) => {
      const { extraction_result } = this.context;
      const { state } = extraction_result;
      if (state != EXTRACTION_SUCCESS) {
        rej('extraction failed');
      }
      res();
    });
  },
};
