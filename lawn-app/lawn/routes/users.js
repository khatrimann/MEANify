var express = require('express');
var controller = require('../controller/userController');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

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
    User.findById({ _id:req.params.id })
    .populate('address')
    .then(user => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user.address);
    });
});

module.exports = router;
