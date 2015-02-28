'use strict';

var mongoose = require('../../database').mongoose,
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'username', hashField: 'password', usernameLowerCase: true });

var User = mongoose.model('User', userSchema, 'Users');

exports.User = User;