
var AppRoot = React.createClass({
	render: function () {
		return (
			<div>
				<Header router={this.props.router}/>
				<hr/>
				<View router={this.props.router}/>
			</div>
		);
	}
});