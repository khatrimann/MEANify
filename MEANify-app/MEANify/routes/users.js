var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => { 
  User.register(new User({username: req.body.username, firstname: req.body.firstname, lastname: req.body.lastname, admin: req.body.admin}), 
    req.body.password, (err, user) => {
    if(err) {
      // console.log("err");
      // console.log(req.body.firstname);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      // console.log(req.body.username);
      // console.log(req.body.password);
      // console.log(req.body.firstname);
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          console.log("second err");
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
          passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => { 
  console.log("In here"); 
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
  // res.status(200).json({
  //   idToken: token, 
  //   expiresIn: 3600
  // });
  console.log("Logged In!!");
});

router.get('/logout', passport.authenticate('local'), (req, res, next) => {
  if (req.user) {
    authenticate.refreshToken({_id: req.user._id});
    console.log('logged out');
    res.redirect('/');
    if(req.user) console.log(req.user.username);
    else console.log("no user");
  }
  else {
    console.log(req.user);
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/checkJWTToken', (req, res) => {
  console.log(req);
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    console.log("entered");
    console.log(user);
    console.log(req.user);
    if (err)
      return next(err);
    
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

router.route('/:userId')
.get((req,res,next) => {
    User.findById(req.params.userId)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
        console.log("FETCHED ");
        console.log(user);
    }, (err) => {console.log("UNABLE TO FETCH :/userId"); next(err);})
    .catch((err) => next(err));
});

module.exports = router;