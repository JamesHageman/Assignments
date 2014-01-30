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
				<li>
					<a href={'#/assignment/' + assignment._id}>{assignment.title}</a>
				</li>
			);
		});
		var list = <ul>{assignmentListItems}</ul>;

		var rootChildren = [];
		if (this.state.loading) {
			rootChildren.push('Fetching...');
		}
		rootChildren.push(list);

		var root = <div>{rootChildren}</div>
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
			return <div>Fetching...</div>;
		} else {
			if (this.state.assignment) {
				return (
					<div>
						<h3>{this.state.assignment.title}</h3>
						<p>{this.state.assignment.description}</p>
					</div>
				);
			} else {
				return <div></div>;
			}
		}
	}
});


;


window.NotFoundView = React.createClass({
	render: function () {
		return (
			<div>
				<h3>Page not found</h3>
				<a href='#/'>Go to home page</a>
			</div>
		);
	}
});


;


window.RootComponent = React.createClass({
	render: function () {
		return (
			<div>
				<header className="container">
					<h1>Assignments</h1>
				</header>
				<hr/>
				<AppRouter/>
				<hr/>
				<footer className="container">
					<small>2014 James Hageman</small>
				</footer>
			</div>
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
		assignmentList = <AssignmentList/>,
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
			currentView = <AssignmentView/>;

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
			currentView = <NotFoundView/>;
		}
	}).configure({
		notfound: function () {
			location.hash = '/404';
		}
	});

	componentClass = React.createClass({
		render: function () {
			return currentView || <div></div>;
		}
	});

	componentClass.init = function () {
		router.init();
	};

	return componentClass;

})();