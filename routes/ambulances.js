var express = require('express');
var router = express.Router();
var Ambulance = require('../models/ambulance');
var mongoose = require('mongoose');

//get all
router.get('/', function(req,res) {
	Ambulance.find(function(err, ambulances) {
		if(err) throw(err);
		res.json(ambulances);		
	});
});

//get one
router.get('/:id', function(req,res) {
	Ambulance.findOne({_id: req.params.id}, function(err, ambulance) {
		if(err) throw(err);
		res.json(ambulance);
	});
});

//create one
router.post('/', function(req,res) {

	var amb = new Ambulance();
	amb.Hospital_Name = req.body.hospital_name;
	amb.Address = req.body.address;
	amb.PIN = req.body.pin;
	amb.Contacts = req.body.contacts;

	amb.save(function(err) {
		if(err) throw(err);
		res.json({message: 'Ambulance detail created!'});
	});
});

module.exports = router;