'use strict';

var mongoose = require('../../database').mongoose;

var planSchema = new mongoose.Schema({
    startingPoint: {
        type: Number,
        required: true
    },
    endGoal: {
        type: Number,
        required: true
    },
    creator: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    creationDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var Plan = mongoose.model('Plan', planSchema, 'Plans');

exports.Plan = Plan;