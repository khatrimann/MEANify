var express = require('express');
lawnRouter = express.Router();
var controller = require('../controller/lawnController');

lawnRouter.get('/:id', (req, res, next) => {
    controller.fetchData(req, res, next);
});

lawnRouter.post('/:id', (req, res, next) => {
    controller.addLawn(req, res, next);
})

module.exports = lawnRouter;