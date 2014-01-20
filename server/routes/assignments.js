var db = require('../db'),
	mongoose = require('mongoose'),
	_ = require('underscore'),
	authenticate = require('../authenticate'),
	AssignmentSchema, Assignments;

AssignmentSchema = new mongoose.Schema({
	title: String,
	description: String,
	dueDate: String,
	userId: String,
	courseId: String
});

Assignment = mongoose.model('Assignment', AssignmentSchema, 'Assignments');

exports.init = function (server) {

	// GET all
	server.get('/assignments', authenticate, function (req, res) {
		var userId = req.session.userId;

		Assignment
			.find({
				userId: userId
			})
			.exec(function (err, docs) {
				res.send(docs);
			});
	});

	// GET one
	server.get('/assignments/:id', authenticate, function (req, res) {
		var id = req.params.id,
			userId = req.session.userId;

		Assignment
			.findOne({
				_id: id,
				userId: userId
			})
			.exec(function (err, assignment) {
				if (!err && assignment) {
					res.send(assignment);
				} else {
					console.log(err);
					var message = 'Assignment with id "' +
						id + '" was not found';
					res.send({ message: message }, 404);
				}
			});
	});

	// POST create
	server.post('/assignments', authenticate, function (req, res) {
		var data = _.pick(req.body,
							'title',
							'description',
							'dueDate',
							'courseId');

		data.userId = req.session.userId;

		Assignment.create(data, function (err, doc) {
			res.send(doc);
		});
	});

	// PUT update
	server.put('/assignments/:id', authenticate, function (req, res) {
		var data = _.pick(req.body,
							'title',
							'description',
							'dueDate',
							'courseId');

		Assignment
			.update({ _id: req.params.id }, { $set: data })
			.exec(function (err) {
				if (err) {
					res.send({ message: 'Could not update assignment' }, 400);
					return;
				}
				Assignment
					.findById(req.params.id)
					.exec(function (err, doc) {
						res.send(doc);
					});
			});
	});

	// DELETE remove
	server.delete('/assignments/:id', authenticate, function (req, res) {
		Assignment
			.findByIdAndRemove(req.params.id)
			.exec(function (err, product) {
				res.send({});
			});
	});

};