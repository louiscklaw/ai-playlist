var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const POE_SEAT_ONLINE = 1;
const POE_SEAT_OFFLINE = 0;

var PoeSeatStatus = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String },
    status: { type: Number, default: POE_SEAT_ONLINE },
  },
  {
    collection: 'poe-seat-status',
    timestamps: true,
  },
);

var PoeSeatStatusModel = mongoose.model('PoeSeatStatus', PoeSeatStatus);

module.exports = {
  PoeSeatStatus,
  PoeSeatStatusModel,
  POE_SEAT_OFFLINE,
  POE_SEAT_ONLINE,
};
