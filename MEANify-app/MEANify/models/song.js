const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author:  {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const songSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    uplaodedby: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true
    },
    comments: [commentSchema]
},
{
    timestamps: true
});

var Songs = mongoose.model('Song', songSchema);
module.exports = Songs;