var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Invoice = new Schema({
  customer: { type: Schema.Types.ObjectId, ref: 'Customer' },
  amount: { type: Number, required: true },
});
var InvoiceModel = mongoose.model('Invoice', Invoice);

module.exports = { Invoice, InvoiceModel };
