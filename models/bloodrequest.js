var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BloodRequest = new Schema({
	Patient_Name: String,
	Bloodgroup: String,
	Hospital_Name: String,
	Hospital_Address: String,
	City: String,
	Doctor_Name: String,
	Contact_Name: String,
	Contact_Email: String,
	Contact_Number: String,
	When_Required: String,
	Other_Message: String	
}, { versionKey: false});

module.exports = mongoose.model('BloodRequest', BloodRequest);