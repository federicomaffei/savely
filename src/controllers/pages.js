'use strict';

var Plan = require('../models/plan').Plan;

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
            plan.save();
            reply.redirect('dashboard');
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
                reply.view('dashboard', { username: request.state.session.username, startingPoint: docs[0].startingPoint.toFixed(2), endGoal: docs[0].endGoal.toFixed(2), type: docs[0].type });
            });
        },
        config: {
            auth: 'session'
        }
    });
};