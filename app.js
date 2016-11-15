var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*** Authentication ***/
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

/*** Static files ***/
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));
app.use('/templates', express.static(__dirname + '/views/templates/'));
app.use('/app', express.static(__dirname + '/public/javascripts/app'));
app.use('/app', express.static(__dirname + '/public/javascripts/app'));
app.use(express.static(path.join(__dirname, 'public')));

/*** Routes & controllers ***/
var fs = require('fs');
fs.readdirSync('./controllers').forEach(function(file){
    if(file.substr(-3)=='.js'){
        let route = require('./controllers/' + file);
        route.controllers(app);
    }
});

// By default, angular handles the routing on the index page
app.use(function(req, res, next) {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

/*** Exceptions ***/
app.use(function(err,req,res,next) {
    res.status(500).send({"Error" : err.stack});
});


/*** Database ***/
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tchat_cb');

/*** Web socket handling chat's messages ***/
var io = require('socket.io-client');
var socketServer = require('./socket');
socketServer.start();

module.exports = app;