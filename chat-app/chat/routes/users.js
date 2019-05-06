var express = require('express');
var router = express.Router();
var passport = require('passport');
var loginController = require('../controller/login');
var userController = require('../controller/user');
var socket = require('socket.io');


/* GET users listing. */
router.get('/', function(req, res, next) {
  userController.getUsers(req, res, next);
});

   
 /**
 * @swagger
 * definitions:
 *   User:
 *     properties:
 *       username:
 *         type: string

 *       paswword:
 *         type: password

 *  
 */     
/**
* @swagger
* schemes:
*   - http
*   - https
* securityDefinitions:
*   Bearer:
*     type: apiKey
*     name: Authorization
*     in: header
* paths:
*   /users/login:
*     get:
*       security:
*         - Bearer: []
*       responses:
*         '200':
*           description: 'Will send `Authenticated`'
*         '403': 
*           description: 'You do not have necessary permissions for the resource'
*/
router.post('/login', passport.authenticate('local'), (req, res, next) => {
  loginController.login(req, res, next);
});

router.post('/signup', (req, res, next) => {
  loginController.signup(req, res, next);
});

router.post('/:sockedId/send', (req, res, next) => {
  // userController.sendMsg(socket)
})

router.get('/checkJWTToken', (req, res) => {
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

module.exports = router;
