var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VisitedLink = new Schema(
  {
    link: { type: String },
    count: { type: Number, default: 1 },
  },
  {
    collection: 'visited-link',
    timestamps: true,
  },
);
var VisitedLinkModel = mongoose.model('VisitedLink', VisitedLink);

module.exports = { VisitedLink, VisitedLinkModel };
