var express = require('express');
var router = express.Router();
var BloodDonor = require('../models/blooddonor');
var mongoose = require('mongoose');

//get all
router.get('/', function(req,res) {
	BloodDonor.find(function(err, blooddonors) {
		if(err) throw(err);
		res.json(blooddonors);
		console.log(blooddonors.length);		
	});
});

//get one
router.get('/:id', function(req,res) {
	BloodDonor.findOne({_id: req.params.id}, function(err, blooddonor) {
		if(err) throw(err);
		res.json(blooddonor);
	});
});


//create one
router.post('/register', function(req,res) {

	var bdonor = new BloodDonor();
	bdonor.Full_Name = req.body.full_name;
	bdonor.Email = req.body.email;
	bdonor.Password = req.body.password;
	bdonor.Date_of_birth = req.body.dob;
	bdonor.Bloodgroup = req.body.bloodgroup;
	bdonor.Gender = req.body.gender;
	bdonor.Weight = req.body.weight;
	bdonor.Mobile = req.body.mobile;
	bdonor.Address = req.body.address;
	bdonor.City = req.body.city;
	bdonor.Pincode = req.body.pincode;

	bdonor.save(function(err) {
		if(err) throw(err);
		res.json({message: ' Blood Donor details added!'});
	});
});

module.exports = router;