
$(function () {
	$.post('users/login', {
		username: 'james',
		password: '123'
	});
	React.renderComponent(<AppRoot router={new AppRouter()}/>, document.body);
	Backbone.history.start();
});