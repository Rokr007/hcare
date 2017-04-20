var express = require('express');
var router = express.Router();
var City = require('../models/city');
var mongoose = require('mongoose');

//get all
router.get('/', function(req,res) {
	City.find(function(err, cities) {
		if(err) throw(err);
		res.json(cities);		
	});
});

//get one
router.get('/:id', function(req,res) {
	City.findOne({_id: req.params.id}, function(err, city) {
		if(err) throw(err);
		res.json(city);
	});
});

//create one
router.post('/', function(req,res) {

	var cityone = new City();
	cityone.Name = req.body.Name;
	
	cityone.save(function(err) {
		if(err) throw(err);
		res.json({message: 'City detail created!'});
	});
});

module.exports = router;