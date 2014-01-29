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