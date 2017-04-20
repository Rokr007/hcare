var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ambulance = new Schema({
	Hospital_Name: String,
	Address: String,
	PIN: String,
	Contacts: String
}, { versionKey: false});

module.exports = mongoose.model('Ambulance', Ambulance);