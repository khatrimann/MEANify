var express = require('express');
var mongoose = require('mongoose');

var postRouter = express.Router();

postRouter.get('/:start/', (req, res, next) => {
    console.log(typeof(req.params.start));
    var Result;
    
    mongoose.connection.db.collection('fs.files', (err, collection) => {
        if (err) {
            res.json(err);
            return;
        }
        collection.find({})
        .skip(parseInt(req.params.start))
        .limit(4)
        .toArray((err, result) => {
           if(err) {
               res.json(err);
               return;
           } 
           Result = result;
           console.log(result);
           res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(Result);
            return;
        });
    });
    
});

module.exports = postRouter;