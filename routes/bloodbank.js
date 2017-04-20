var express = require('express');
var router = express.Router();
var Hospital = require('../models/hospital');
var mongoose = require('mongoose');

//get all
router.get('/', function(req,res) {
	Hospital.find(function(err, hospitals) {
		if(err) throw(err);
		res.json(hospitals);		
	});
});

//get one
router.get('/:id', function(req,res) {
	Hospital.findOne({_id: req.params.id}, function(err, hospital) {
		if(err) throw(err);
		res.json(hospital);
	});
});

//create one
router.post('/', function(req,res) {

	var hosp = new Hospital();
	hosp.Facility_Name = req.body.facility_name;
	hosp.Contact = req.body.contact;
	hosp.District = req.body.district;
	hosp.State = req.body.state;

	hosp.save(function(err) {
		if(err) throw(err);
		res.json({message: 'Hospital detail created!'});
	});
});

module.exports = router;