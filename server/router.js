var express = require('express');

exports.init = function (server) {
	server.use(express.static('./public/'));
	require('./routes/assignments').init(server);
	require('./routes/users').init(server);
	require('./routes/courses').init(server);
};