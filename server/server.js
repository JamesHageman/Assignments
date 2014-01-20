var express = require('express'),
	db = require('./db'),
	router = require('./router'),
	SessionStore = require('express-sessions'),
	server = express();

server
	.use(express.json())
	.use(express.urlencoded())
	.use(express.cookieParser())
	.use(express.session({
		secret: 'asdf',
		store: new SessionStore({
			storage: 'mongodb',
			db: 'assignments',
			collection: 'session',
			instance: require('mongoose')
		})
	}));

db.on('error', function (error) {
	console.log('DB Error: ', error);
});

db.once('open', function () {
	router.init(server);
	server.listen(8000);
	console.log('Server running on port 8000');
});
