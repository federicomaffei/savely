'use strict';

exports.register = function (server, options, next) {
    require('../controllers/pages').init(server);
    require('../controllers/static').init(server);

    next();
};

exports.register.attributes = {
    name: 'router',
    version: '1.0.0'
};