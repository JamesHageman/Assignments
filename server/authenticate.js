module.exports = function (req, res, next) {
	if (req.session.userId) {
		next();
		return;
	}
	res.send({ 'message': 'Not logged in' }, 403);
};