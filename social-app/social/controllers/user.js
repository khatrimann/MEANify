var User = require('../models/user');
var Post = require('../models/post');
module.exports.getUsers = (req, res, next) => {
    User.aggregate([
        { $project: { username: 1} }
    ])
    .then(users => {
        res.json(users);
    });
};

module.exports.getUser = (req, res, next) => {
    User.findById({ _id: req.params.id })
    .populate('posts')
    .then(user => {
        res.json(user);
    });
};

module.exports.post = (req, res, next) => {
    Post.create(new Post({
        post: req.body.text
    }), (err, post) => {
        if(err) {
            console.log(err);
            return next(err);
        }
        
        User.findOneAndUpdate({ _id: req.params.id }, { $push: { posts: post._id } })
        .then(user => {
            res.json(user);
        });
    });
};

module.exports.getPost = (req, res, next) => {
    User.findById({ _id: req.params.id})
    .populate('posts')
    .then(user => {
        res.json(user.posts.reverse());
    });
};

module.exports.mentions = (req, res, next) => {
    User.findById({ _id: req.params.id })
    .then(user => {
        Post.find({ post: { $regex: user.username } })
        .sort({ _id: -1})
        .then(post => {
            res.json(post);
        });
    });
};