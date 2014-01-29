window.App = (function ($, React) {
	return {
		init: function () {
			location.hash = location.hash || '#/';

			$.post('/users/login', {
				username: 'james',
				password: 123
			}).done(function () {
				AppRouter.init();
			});
		}
	};
})(jQuery, React);