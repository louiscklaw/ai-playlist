var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Customer = new Schema({
  name: { type: String, required: true },
  comment: { type: String },
  count: { type: Number, default: 1 },
});
var CustomerModel = mongoose.model('Customer', Customer);

module.exports = { Customer, CustomerModel };
