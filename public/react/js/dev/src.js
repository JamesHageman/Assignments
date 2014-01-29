window.API = (function ($) {
	return {
		assignments: {
			fetchAll: function () {
				var def = $.Deferred();
				$.get('/assignments').done(function (data) {
					setTimeout(function () {
						def.resolve(data);
					}, 500);
				});
				return def.promise();
			},
			get: function (id) {
				var def = $.Deferred();
				$.get('/assignments/' + id).done(function (data) {
					setTimeout(function () {
						def.resolve(data);
					}, 500);
				});
				return def.promise();
			}
		}
	};
})(jQuery);


;


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


;


window.AssignmentList = React.createClass({
	getInitialState: function () {
		return {
			assignments: [],
			loading: false
		};
	},
	render: function () {

		var assignmentListItems = this.state.assignments.map(function (assignment) {
			return React.DOM.li(null,
				React.DOM.a({
					href: '#/assignment/' + assignment._id
				}, assignment.title));
		});
		var list = React.DOM.ul(null, assignmentListItems);

		var rootChildren = [];
		if (this.state.loading) {
			rootChildren.push('Fetching...');
		}
		rootChildren.push(list);

		var root = React.DOM.div(null, rootChildren);
		return root;
	}
});


;


window.AssignmentView = React.createClass({
	getInitialState: function () {
		return {
			loading: false,
			assignment: null
		};
	},
	render: function () {
		if (this.state.loading) {
			return React.DOM.div(null, 'Fetching...');
		} else {
			if (this.state.assignment) {
				return React.DOM.div(null, [
					React.DOM.h3(null, this.state.assignment.title),
					React.DOM.p(null, this.state.assignment.description)
				]);
			} else {
				return React.DOM.div(null, '');
			}
		}
	}
});


;


window.NotFoundView = React.createClass({
	render: function () {
		return React.DOM.div(null, [
			React.DOM.h3(null, 'Page not found'),
			React.DOM.a({ href: '#/' }, 'Go to home page')
		]);
	}
});


;


$(function () {
	App.init();
});


;


window.AppRouter = (function () {
	var rootNode = document.getElementById('main'),
		assignmentList = AssignmentList(),
		_assignments = [];

	return new Router({
		'/': function () {

			React.renderComponent(assignmentList, rootNode);

			assignmentList.setState({
				assignments: _assignments,
				loading: true
			});

			API.assignments.fetchAll().done(function (assignments) {
				_assignments = assignments;
				assignmentList.setState({
					assignments: _assignments,
					loading: false
				});
			});
		},
		'/assignment/:id': function (id) {
			var view = AssignmentView();

			React.renderComponent(view, rootNode);

			view.setState({
				loading: true
			});

			API.assignments.get(id).done(function (assignment) {
				view.setState({
					loading: false,
					assignment: assignment
				});
			});
		},
		'/404': function () {
			React.renderComponent(NotFoundView(), rootNode);
		}
	}).configure({
		notfound: function () {
			location.hash = '/404';
		}
	});
})();