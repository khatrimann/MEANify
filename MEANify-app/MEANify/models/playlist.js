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

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    nsongs: {
        type: Number,
        required: true,
    },
    image: {
        type: string,
        required: true
    },
    createddby: {
        type: String,
        required: true,
    },
    comments: [commentSchema]
},
{
    timestamps: true
});

module.exports = mongoose.model('Playlist', playlistSchema);