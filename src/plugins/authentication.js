'use strict';

var joi = require('joi');
var User = require('../models/user').User;

exports.register = function(server, options, next) {

    server.auth.strategy('session', 'cookie', {
        password: 'expencesecret',
        cookie: 'session',
        redirectTo: '/login',
        isSecure: false,
        ttl: 24* 60 * 60 * 1000
    });

    server.ext('onPostAuth', function(req, reply) {
        if(req.auth.isAuthenticated) {
            req.user = req.auth.credentials.user;
        }
        reply.continue();
    });

    server.route({
        method: 'GET',
        path: '/login',
        handler: function (request, reply) {
            reply.view('login');
        }
    });

    server.route({
        method: 'GET',
        path: '/register',
        handler: function (request, reply) {
            reply.view('register');
        }
    });

    server.route({
        method: 'POST',
        path: '/login',
        handler: function (request, reply) {
            User.authenticate()(request.payload.username, request.payload.password, function (err, user, message) {
                if (err) {
                    console.error(err);
                    return reply.redirect('/login');
                }

                if (user) {
                    request.auth.session.set({ user: user });
                    return reply.redirect('/');
                }

                return reply(message);
            });
        },
        config: {
            auth: false,
            plugins: {
                'hapi-auth-cookie': {
                    redirectTo: false
                }
            },
            validate: {
                payload: {
                    username: joi.string().required(),
                    password: joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'POST',
        path: '/register',
        handler: function (request, reply) {
            var newUser = new User({
                email: request.payload.email,
                username: request.payload.username
            });

            User.register(newUser, request.payload.password, function(err, user) {
                if (err) {
                    reply(err);
                    return;
                }
                reply.redirect('/');
            });
        },
        config: {
            validate: {
                payload: {
                    email: joi.string().email().required(),
                    username: joi.string().required(),
                    password: joi.string().required()
                }
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/logout',
        handler: function(request, reply) {
            request.auth.session.clear();
            return reply.redirect('/');
        },
        config: {
            auth: 'session'
        }
    });

    next();
};


exports.register.attributes = {
    name: 'authentication',
    version: '1.0.0'
};