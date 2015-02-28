'use strict';

var mongoose = require('mongoose'),
    config = require('./config');

mongoose.connect('mongodb://' + config.mongo.username + ':' + config.mongo.password + '@' + config.mongo.url + '/' + config.mongo.database);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('connection with database succeeded.');
});

exports.mongoose = mongoose;
exports.db = db;