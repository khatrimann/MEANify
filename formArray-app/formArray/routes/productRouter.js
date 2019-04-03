var express = require('express');
var router = express.Router();
var Product = require('../models/product');



router.get('/', function(req, res, next) {
    Product.find({}).
    then((formdata) => {
      res.statusCode = 200;
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(formdata);
  }, (err) => next(err));
  });

router.post('/', (req, res, next) => {
 console.log(req.body);
Product.create(req.body).
then((products) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
console.log("products : " +products);
    res.json(products);
},err => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.json({msg: err});
  });
});

router.delete('/:id', (req, res, next) => {
    Product.findByIdAndDelete({_id: req.params.id})
    .then((err) => {
        console.log(err);
    });
});

router.get('/:id', (req,res, next) => {
    Product.findById({_id: req.params.id})
    .then(product => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    }, err => next(err))
    .catch(err => next(err));
});

router.put('/:id', (req, res, next) => {
    console.log("searching for "+req.params.id);
    console.log(req.body);
    Product.findByIdAndUpdate({_id: req.params.id}, req.body)
    .then(product => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: true});
    }, err => next(err))
    .catch(err => next(err));
});

module.exports = router;