const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const Song = require("../models/song");
const authenticate = require('../authenticate');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(nll, 'public/music');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const musicFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(mp3|wma|waw|ogg)$/)) {
        return cb(new Error('You can upload only audio files!'), false);
    }
    cb(null, true);
};

const upload = multer({storage: storage, fileFilter: musicFileFilter});

const uploadMusic = express.Router();

uploadMusic.use(bodyParser.json());

uploadMusic.route('/')
.post(upload.single('name'), (req, res, next) => {
    //req.body.song = req.file.filename.toUpperCase();
    req.body.location = '/public/songs/song.mp3';
    console.log(req.body);
    Song.create(req.body)
    .then((song) => {
        console.log('Song Created ', song);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    }, (err) => next(err))
    .catch((err) => next(err));
    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'application/json');
    // res.json(req.body);
    // res.render('success', {task: 'upload'});
});

module.exports = uploadMusic;