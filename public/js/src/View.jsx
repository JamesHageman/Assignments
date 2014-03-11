
// Displays the AppRouter's component
var View = React.createClass({
	mixins: [RouterMixin],

	render: function () {
		return (
			<div className="container">
				{this.props.router.component}
			</div>
		);
	}
});