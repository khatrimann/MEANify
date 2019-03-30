var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  var gfs = Grid(mongoose.connection.db);
  var readstream = gfs.createReadStream({_id: '5c9f2fcc545e2f364172067a'});
  var buffer = "";

  readstream.on("data", function (chunk) {
    buffer += chunk;
  });

  readstream.on("end", function () {
    console.log("contents of file:\n\n", buffer);
  });
});

module.exports = router;
