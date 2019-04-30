var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportlocal = require('passport-local-mongoose');

var userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'mPost'
    }]
});

userSchema.plugin(passportlocal);

module.exports = mongoose.model('User', userSchema);