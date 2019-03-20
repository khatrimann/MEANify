const express = require('express');
const bodyParser = require('body-parser');
const authenticate = require('./authenticate');

const User = require('../models/user');

const profileRouter = express.Router();

profileRouter.route('/')
.get(authenticate.verifyUser, (req, res) => {
    User.find({})
    .then((songs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(songs);
    }, (err) => next(err))
    .catch((err) => next(err));
});