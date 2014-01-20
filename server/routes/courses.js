var db = require('../db'),
	mongoose = require('mongoose'),
	authenticate = require('../authenticate'),
	_ = require('underscore'),
	CourseSchema, Course, getCourses;

CourseSchema = new mongoose.Schema({
	name: String,
	userId: String
});

Course = mongoose.model('Course', CourseSchema, 'Courses');


getCourses = function (req, callback) {
	var userId = req.session.userId;
	Course.find({ userId: userId }, callback);
};

exports.init = function (server) {

	server.get('/courses', authenticate, function (req, res) {
		getCourses(req, function (err, docs) {
			if (err) {
				var message = 'Error finding courses';
				res.send({ message: message }, 500);
			}

			res.send(docs);
		});
	});

	server.post('/courses', authenticate, function (req, res) {
		var data = _.pick(req.body, 'name');
		data.userId = req.session.userId;

		Course.create(data, function (err, doc) {
			if (err) {
				res.send({
					message: 'Error creating course'
				}, 500);
				return;
			}

			res.send(doc);
		});
	});

	server.delete('/courses/:id', authenticate, function (req, res) {
		Course.findOneAndRemove({
			_id: req.params.id,
			userId: req.session.userId
		}, function (err) {
			if (err) {
				res.send({
					message: 'Error deleting course'
				}, 500);
				return;
			}

			res.send({});
		});
	});

};

exports.get = getCourses;