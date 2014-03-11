
var AppRouter = Backbone.Router.extend({
	routes: {
		'assignment/:id': 'assignment',
		'*asdf': 'home'
	},

	home: function () {
		this.component = <div>Home!</div>;
	},
	assignment: function (id) {
		var assignment = new Assignment({ _id: id });
		assignment.fetch();

		this.component = <div>Assignment {id}</div>;
	},

	initialize: function () {
		this.component = <div></div>;
	}
});