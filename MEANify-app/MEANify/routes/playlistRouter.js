const express = require('express');
const bodyParser = require('body-parser');

const Songs = require('../models/song');

const playlistRouter = express.Router();

playlistRouter.use(bodyParser.json());

playlistRouter.route('/')
.get((req, res, next) => {
    Songs.find({})
    .then((songs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(songs);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = playlistRouter;