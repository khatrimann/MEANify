var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var fs = require('fs');


/* GET home page. */
router.get('/', function(req, res, next) {
  var gfs = Grid(mongoose.connection.db);
  var data_db = [];
  mongoose.connection.db.collection("fs.files", function(err, collection){
    collection.find({}).toArray(function(err, data){
        console.log(data); // it will print your collection data
        for(var i=0;i<data.length;i++) {
          console.log(data[i]._id);
          var readstream = gfs.createReadStream({_id: data[i]._id});
          readstream.pipe(res);
        }
    });
});
  // var readstream = gfs.createReadStream({_id: '5c9f2fcc545e2f364172067a'});
  // readstream.pipe(res);
});

module.exports = router;
