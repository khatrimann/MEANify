const express = require('express');
const bodyParser = require('body-parser');

const Songs = require('../models/song');

const homeRouter = express.Router();

homeRouter.route('/')
.get((req, res, next) => {
    console.log("hit");
    Songs.find(req.query)
    .then((songs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(songs);
    }, (err) => next(err))
    .catch((err) => next(err));
});

homeRouter.route('/:songId')
.get((req,res,next) => {
    console.log(req.params);
    Songs.findOne({"id": Number(req.params.songId)})
    .then((song) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(song);
        console.log("FETCHED ");
        console.log(song);
    }, (err) => {console.log("UNABLE TO FETCH :/songId"); next(err);})
    .catch((err) => next(err));
});

module.exports = homeRouter;