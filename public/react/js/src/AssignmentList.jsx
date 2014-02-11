
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

		var root = <div>{rootChildren}</div>;
		return root;
	}
});