'use strict';

exports.init = function(server) {
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
            if(request.state.session) {
                reply.view('index', {username: request.state.session.username});
            }
            else {
                reply.view('index');
            }
        },
        config: {
            auth: false
        }
	});
};