const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
// const mongoose = require('mongoose');
// const fs = require('fs');
// var grid = require("gridfs-stream");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});

const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /upload');
})
.post( upload.array('imageFile', 5), (req, res) => {
    console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put( (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /upload');
})
.delete( (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /upload');
});

module.exports = uploadRouter;