
var Header = React.createClass({
	mixins: [RouterMixin],
	render: function () {
		return (
			<div className="container">
				<div className="row">
					<div className="col-xs-12">
						<h1><i className="fa fa-pencil"/>Assignments</h1>
					</div>
				</div>
			</div>
		);
	}
});