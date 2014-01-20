var db = require('../db'),
	mongoose = require('mongoose'),
	crypto = require('crypto'),
	Courses = require('./courses'),
	_ = require('underscore'),
	authenticate = require('../authenticate'),
	UserSchema, User, hash, getUser;

hash = function (data) {
	var _hash = crypto.createHash('md5');
	_hash.update(data);
	return _hash.digest('hex');
};

UserSchema = new mongoose.Schema({
	username: String,
	password: String,
	randomStr: String,
	email: String
});

User = mongoose.model('User', UserSchema, 'Users');


// Every time a user object is sent to the client, it should be consistent.
// That's what this function is for.
getUser = function (req, callback) {
	User.findById(req.session.userId)
			.lean() // user is just a plain JS object -- allows extension
			.exec(function (err, user) {
			if (err || !user) {
				callback(err || true);
				return;
			}

			Courses.get(req, function (err, docs) {
				if (err) {
					callback(err);
					return;
				}

				user.courses = docs;
				callback(null, user);
			});
		});
};

exports.init = function (server) {

	// POST login
	server.post('/users/login', function (req, res) {
		var username = req.body.username,
			password = req.body.password;

		User.findOne({ username: username })
			.exec(function (err, user) {
				var hashedPassword;

				if (err || !user) {
					res.send({ message: 'User not found' }, 404);
					return;
				}

				// console.log(err, user);
				hashedPassword = hash(password + user.randomStr);

				if (hashedPassword == user.password) {
					req.session.userId = user._id;
					getUser(req, function (err, user) {
						if (err) {
							res.send({
								message: 'Error gettting user information'
							}, 500);
							return;
						}

						res.send(user);
					});
				} else {
					res.send({ message: 'Incorrect password' }, 401);
				}
			});
	});

	// POST create
	server.post('/users', function (req, res) {
		var username = req.body.username,
			password = req.body.password,
			randomStr = hash(Date.now().toString()),
			email = req.body.email,
			hashedPassword = hash(password + randomStr);

		User
			.create({
				username: username,
				password: hashedPassword,
				randomStr: randomStr,
				email: email
			}, function (err, user) {
				if (err) {
					res.send({ message: 'Unable to create user' }, 500);
					return;
				}

				req.session.userId = user._id;
				getUser(req, function (err, user) {
					if (err) {
						res.send({
							message: 'Error gettting user information'
						}, 500);
						return;
					}

					res.send(user);
				});
			});

	});

	// GET me (current logged in user)
	server.get('/users/me', authenticate, function (req, res) {
		getUser(req, function (err, user) {
			if (err) {
				res.send({
					message: 'Error gettting user information'
				}, 500);
				return;
			}

			res.send(user);
		});
	});

	// POST logout
	server.post('/users/logout', authenticate, function (req, res) {
		req.session.userId = 0;
		res.send({});
	});

};