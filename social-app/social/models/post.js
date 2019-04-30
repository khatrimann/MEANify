var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var postSchema = new Schema({
    post: {
        type: String,
        maxlength: 1024
    }
});

module.exports = mongoose.model('mPost', postSchema);