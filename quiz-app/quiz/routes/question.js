var express = require('express');
var router = express.Router();
var Questions = require('../models/question');
var json2xml = require('json2xml');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Questions.aggregate([{ $sample: { size: 15 } }, { $project: { _id: 0 }}])
  .then( questions => {
    res.set('Content-Type', 'text/xml');
    
    console.log(questions[0]);
    console.log(json2xml(questions));
    res.send(json2xml(questions));  
  });
});

module.exports = router;
