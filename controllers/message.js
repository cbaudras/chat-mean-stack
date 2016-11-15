var express = require('express');
var passport = require('passport');
var Message = require('../models/message');
var router = express.Router();

module.exports.controllers = function(app){
    app.get('/message/last', function(req, res){
        Message.find({}, function(err, messages){return res.send(messages);})
    });
}



