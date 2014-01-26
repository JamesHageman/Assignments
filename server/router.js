var express = require('express');

exports.init = function (server) {
	server.use(express.static('./public/'), {
		maxAge: 86400000 // 1 day
	});
	require('./routes/assignments').init(server);
	require('./routes/users').init(server);
	require('./routes/courses').init(server);
};