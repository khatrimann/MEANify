const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
var fs = require('fs');
var mongoose = require("mongoose");
var Grid = require('gridfs-stream');
const config = require('../config');

// var GridFS = Grid(mongoose.connection.db, mongoose.mongo);

// function putFile(path, name, callback) {
//     var writestream = GridFS.createWriteStream({
//         filename: name
//     });
//     writestream.on('close', function (file) {
//       callback(null, file);
//     });
//     fs.createReadStream(path).pipe(writestream);
// }

const storage = require('multer-gridfs-storage')({
    url: config.mongoUrl,
    file: (req, file) => {
        return {
          filename: file.originalname + '_' + Date.now()
        };
      },
 });

const storageLocal = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFileFilter});
const uploadLocal = multer({ storage: storageLocal, fileFilter: imageFileFilter});


const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/')
.get((req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /upload');
})
.post( upload.array('imageFile', 5), uploadLocal.array('imageFile', 5),(req, res) => {
    console.log(req.body);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
    // putFile()
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