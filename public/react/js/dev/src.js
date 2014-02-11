/** @jsx React.DOM */


;


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
			this.root = RootComponent(null);

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
			return (
				React.DOM.li(null, 
					React.DOM.a( {href:'#/assignment/' + assignment._id}, assignment.title)
				)
			);
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
			return React.DOM.div(null, "Fetching...");
		} else {
			if (this.state.assignment) {
				return (
					React.DOM.div(null, 
						React.DOM.h3(null, this.state.assignment.title),
						React.DOM.p(null, this.state.assignment.description)
					)
				);
			} else {
				return React.DOM.div(null);
			}
		}
	}
});


;


window.NotFoundView = React.createClass({
	render: function () {
		return (
			React.DOM.div(null, 
				React.DOM.h3(null, "Page not found"),
				React.DOM.a( {href:"#/"}, "Go to home page")
			)
		);
	}
});


;


window.RootComponent = React.createClass({
	render: function () {
		return (
			React.DOM.div(null, 
				React.DOM.header( {className:"container"}, 
					React.DOM.h1(null, "Assignments")
				),
				React.DOM.hr(null),
				AppRouter(null),
				React.DOM.hr(null),
				React.DOM.footer( {className:"container"}, 
					React.DOM.small(null, "2014 James Hageman")
				)
			)
		);
	}
});


;


$(function () {
	App.init();
});


;


window.AppRouter = (function () {
	var rootNode = document.getElementById('main'),
		assignmentList = AssignmentList(null),
		_assignments = [],
		router, currentView, componentClass;

	router = new Router({
		'/': function () {

			currentView = assignmentList;

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
			currentView = AssignmentView(null);

			currentView.setState({
				loading: true
			});

			API.assignments.get(id).done(function (assignment) {
				currentView.setState({
					loading: false,
					assignment: assignment
				});
			});
		},
		'/404': function () {
			currentView = NotFoundView(null);
		}
	}).configure({
		notfound: function () {
			location.hash = '/404';
		}
	});

	componentClass = React.createClass({
		render: function () {
			return currentView || React.DOM.div(null);
		}
	});

	componentClass.init = function () {
		router.init();
	};

	return componentClass;

})();