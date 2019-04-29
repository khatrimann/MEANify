var User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
    User.aggregate([
        { $project: { username: 1} }
    ])
    .then(users => {
        res.json(users);
    });
};