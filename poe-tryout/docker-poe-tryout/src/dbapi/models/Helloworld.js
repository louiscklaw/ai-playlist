const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Helloworld',
  new mongoose.Schema(
    {
      name: { type: String, required: true },
    },
    { timestamps: true },
  ),
);
