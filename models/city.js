var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var City = new Schema({
	Name: String	
}, { versionKey: false});

module.exports = mongoose.model('City', City);