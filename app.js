'use strict';

var Path = require('path'),
Hapi = require('hapi');

var server = new Hapi.Server({
	connections: {
		router: {
			isCaseSensitive: false,
			stripTrailingSlash: true
		},
		routes: {
			files: {
				relativeTo: Path.join(__dirname, 'public')
			},
			validate: {
				options: {
					allowUnknown: true
				}
			}
		}
	}
});

server.connection({ port: 3000 });

server.views({
	engines: {
		jade: {
			module: require('jade')
		}
	},
	context: {},
	path: __dirname + '/src/views',
	layoutPath: __dirname + '/src/views/layout'
});

server.register([
    require('./src/plugins/router')
], function (err) {

    if(err) {
        console.log('plugins not loaded.');
    }

    server.start(function (err) {
        if(err) {
          console.log(err);
        };
        console.log('Server running at:', server.info.uri);
    });
});
