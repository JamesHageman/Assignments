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