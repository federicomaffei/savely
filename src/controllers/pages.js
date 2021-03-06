'use strict';

var Plan = require('../models/plan').Plan,
    calculator = require('../../src/utilities/PMTCalculator');

exports.init = function(server) {
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
            if(request.state.session) {
                reply.view('index', { username: request.state.session.username });
            }
            else {
                reply.view('index');
            }
        },
        config: {
            auth: false
        }
	});

    server.route({
        method: 'GET',
        path: '/plans/new',
        handler: function (request, reply) {
            reply.view('plans/new', { username: request.state.session.username });
        },
        config: {
            auth: 'session'
        }
    });

    server.route({
        method: 'POST',
        path: '/plans',
        handler: function (request, reply) {
            var plan = new Plan({
                startingPoint: request.payload.start,
                endGoal: request.payload.goal,
                creator: request.user.email,
                type: request.payload.type
            });
            plan.save(function(err) {
                if(err) {
                    reply.view('error', { username: request.state.session.username, err: 'you already have a plan!' });
                }
                else {
                    reply.redirect('dashboard');
                }
            });
        },
        config: {
            auth: 'session'
        }
    });

    server.route({
        method: 'GET',
        path: '/dashboard',
        handler: function (request, reply) {
            Plan.find({creator: request.user.email}, function(err, docs){
                reply.view('dashboard', {
                    username: request.state.session.username,
                    plans: docs,
                    calculator: calculator
                });
            });
        },
        config: {
            auth: 'session'
        }
    });
};