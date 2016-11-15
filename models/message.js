var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Message = new Schema({
    text: String,
    username: String,
    date: Date
});

module.exports = mongoose.model('Message', Message);