'use strict';

exports.init = function(server) {
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
            if(request.state.session) {
                reply.view('index', {user: request.state.session.user});
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