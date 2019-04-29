var express = require('express');
var router = express.Router();
var passport = require('passport');
var loginController = require('../controllers/login');
var userController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  userController.getUsers(req, res, next);
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  loginController.login(req, res, next);
});

router.post('/signup', (req, res, next) => {
  loginController.signup(req, res, next);
});

router.get('/checkJWTToken', (req, res) => {
  console.log(req);
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    console.log("entered");
    console.log(user);
    console.log(req.user);
    if (err)
      res.json(err);
    
    if (!user) {
      console.log("User doesn't exists");
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      console.log("User exists");
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});

    }
  }) (req, res);
});

module.exports = router;
