'use strict';

exports.init = function(server) {
    server.route([{
        method: 'GET',
        path: '/favicon.ico',
        handler: {
            file: './favicon.ico'
        },
        config: {
            auth: false,
            description: 'static'
        }
    },
        {
            method: 'GET',
            path: '/css/{path*}',
            handler: {
                directory: {
                    path: './css'
                }
            },
            config: {
                auth: false,
                description: 'static'
            }
        },
        {
            method: 'GET',
            path: '/img/{path*}',
            handler: {
                directory: {
                    path: './img'
                }
            },
            config: {
                auth: false,
                description: 'static'
            }
        },
        {
            method: 'GET',
            path: '/js/{path*}',
            handler: {
                directory: {
                    path: './js'
                }
            },
            config: {
                auth: false,
                description: 'static'
            }
        }]);
};