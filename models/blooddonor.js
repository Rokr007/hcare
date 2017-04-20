var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BloodDonor = new Schema({
	Full_Name: String,
	Email: String,
	Password: String,
	Date_of_birth: String,
	Bloodgroup: String,
	Gender: String,
	Weight: String,
	Mobile: String,
	Address: String,
	City: String,
	Pincode: String	
}, { versionKey: false});

module.exports = mongoose.model('BloodDonor', BloodDonor);