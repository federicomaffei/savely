'use strict';

exports.init = function(server) {
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			reply.view('index');
		},
		config: {
			auth: false
		}
	});
};