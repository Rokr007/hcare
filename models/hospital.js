var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Hospital = new Schema({
	Facility_Name: String,
	Contact: String,
	District: String,
	State: String
}, { versionKey: false});

module.exports = mongoose.model('Hospital', Hospital);