var mongoose = require('mongoose'),
	db;

mongoose.connect('mongodb://localhost:27017/assignments');
db = mongoose.connection;

module.exports = db;