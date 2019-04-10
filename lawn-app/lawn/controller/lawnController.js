var Lawns = require('../models/address');   // LawnSchema fetching lawn addresss

module.exports.fetchData = (req, res, next) => {
     Lawns.find({ _id: req.params.id})
     .populate('precipitation')
     .populate('temperature')
     .then(result => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(result);
     });
}