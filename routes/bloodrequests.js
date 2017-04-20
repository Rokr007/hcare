var express = require('express');
var router = express.Router();
var BloodRequest = require('../models/bloodrequest');
var mongoose = require('mongoose');

//get all
router.get('/', function(req,res) {
	BloodRequest.find(function(err, bloodrequests) {
		if(err) throw(err);
		res.json(bloodrequests);		
	});
});

//get one
router.get('/:id', function(req,res) {
	BloodRequest.findOne({_id: req.params.id}, function(err, bloodrequest) {
		if(err) throw(err);
		res.json(bloodrequest);
	});
});

//create one
router.post('/register', function(req,res) {
	var brequest = new BloodRequest();	
	brequest.Patient_Name = req.body.patient_name,
	brequest.Bloodgroup = req.body.bloodgroup ,
	brequest.Hospital_Name = req.body.hospital_name,
	brequest.Hospital_Address = req.body.hospital_address,
	brequest.City = req.body.city,
	brequest.Doctor_Name = req.body.doctor_name,
	brequest.Contact_Name = req.body.contact_name,
	brequest.Contact_Email = req.body.contact_email,
	brequest.Contact_Number = req.body.contact_number,
	brequest.When_Required = req.body.when_required,
	brequest.Other_Message = req.body.other_msg	

	brequest.save(function(err) {
		if(err) throw(err);
		res.json({message: ' Blood Request details added!'});
	});
});

module.exports = router;