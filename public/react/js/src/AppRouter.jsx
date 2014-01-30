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