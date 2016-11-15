var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var mongoose = require('mongoose');

var chat = {
    start: function(){
        server.listen(8001);
        io.set("origins", "*:*");

        io.on('connection', function (socket) {
            socket.on('newMessage', function (data) {
                socket.emit('chatUpdate',data);
                socket.broadcast.emit('chatUpdate',data);

                // Saving message in DB
                var Message = require('./models/message');

                var message = new Message ({
                    text: data.text,
                    username: data.username
                });

                message.save(function (err) {if (err) console.log ('Error on save!')});
            });
            socket.on('newUser', function (data) {
                socket.emit('chatUpdate',
                    {'username':'','text':data+' has entered the room'});
                socket.broadcast.emit('chatUpdate',
                    {'username':'','text':data+' has entered the room'});
            });
        });
    }
}

module.exports = chat;