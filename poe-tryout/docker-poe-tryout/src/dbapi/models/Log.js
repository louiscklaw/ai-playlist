const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Log',
  new mongoose.Schema(
    {
      level: { type: String, required: true },
      comment: { type: String },
    },
    { timestamps: true },
  ),
);
