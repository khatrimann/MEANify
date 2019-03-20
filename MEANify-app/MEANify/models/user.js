const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const localPassportMongoose = require('passport-local-mongoose');

const User = new Schema({
    firstname: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      admin: {
          type: Boolean,
          default: false
      }
});

User.plugin(localPassportMongoose);

module.exports = mongoose.model('User', User);