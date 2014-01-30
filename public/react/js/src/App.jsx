window.App = (function ($, React) {
	return {
		init: function () {
			this.root = <RootComponent/>;

			location.hash = location.hash || '#/';

			$.post('/users/login', {
				username: 'james',
				password: 123
			}).done(function () {
				React.renderComponent(this.root, document.getElementById('root'));
				AppRouter.init();
			}.bind(this));
		}
	};
})(jQuery, React);