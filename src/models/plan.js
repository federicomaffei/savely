'use strict';

var mongoose = require('../../database').mongoose;
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var planSchema = new mongoose.Schema({
    startingPoint: {
        type: Currency,
        required: true
    },
    endGoal: {
        type: Currency,
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