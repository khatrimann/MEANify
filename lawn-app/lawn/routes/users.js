var express = require('express');
var controller = require('../controller/userController');
var router = express.Router();
var passport = require('passport');
//var Lawn = require('../models/address');    // LawnSchema as lawn
var User = require('../models/user');
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  controller.login(req, res, next);
});

router.post('/signup', (req, res, next) => {
  controller.signup(req, res, next);
})

router.get('/checkJWTToken', (req, res) => {
  controller.checkJWT(req, res);
});

router.get('/:id', (req, res, next) => {
    User.aggregate([
        {
          $match: {
          _id: mongoose.Types.ObjectId(req.params.id)
          }
        },
        {
          $lookup: { 
            from: "addresses",
            localField: "_id",
            foreignField: "user",
            as: "lawns"
        }
      }
    ]).then(user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user[0].lawns);
      });
});

module.exports = router;
