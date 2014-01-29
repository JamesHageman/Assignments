window.NotFoundView = React.createClass({
	render: function () {
		return React.DOM.div(null, [
			React.DOM.h3(null, 'Page not found'),
			React.DOM.a({ href: '#/' }, 'Go to home page')
		]);
	}
});