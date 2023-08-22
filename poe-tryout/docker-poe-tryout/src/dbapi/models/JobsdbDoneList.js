var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JobsdbDoneList = new Schema({
  link: { type: String, required: true },
});

var JobsdbDoneListModel = mongoose.model('JobsdbDoneList', JobsdbDoneList);

module.exports = { JobsdbDoneList, JobsdbDoneListModel };
