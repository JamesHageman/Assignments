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