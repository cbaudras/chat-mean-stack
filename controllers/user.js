var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();

module.exports.controllers = function(app){
    app.post('/user/register', function(req, res){

        if(req.body.username == null || req.body.username == ""){
            return res.json({ errorMsg : 'Username is mandatory' });
        }

        // TODO: User.register doesn't seem to set password...
        User.register(new User({ username : req.body.username, password: req.body.password }), req.body.password , function(err, user) {
            if (err) {
                return res.json({ errorMsg : err.message });
            }

            try{
                passport.authenticate('local')(req, res, function () {
                    return res.json({ user : user });
                });
            }catch(e){
                throw new Error('Failed to authenticate');
            }
        });
    });

    app.post('/user/login', passport.authenticate('local',{
        failureRedirect : '/user/unauthorized', // redirect to be able to send back a json
    }), function(req, res) {
        return res.json({ user : {username: req.body.username} });
    });

    app.get('/user/logout', function(req, res) {
        req.logout();

        return res.json({msg: 'Logged out'})
    });

    app.get('/user/unauthorized', function(req, res) {
        return res.json({ errorMsg : 'Nope !' });
    });
}



