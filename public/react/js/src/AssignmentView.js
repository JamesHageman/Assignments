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