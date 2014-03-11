
var RouterMixin = {
	propTypes: {
		router: React.PropTypes.instanceOf(Backbone.Router).isRequired
	},
	componentWillMount: function () {
		_.extend(this, Backbone.Events);

		this.listenTo(this.props.router, 'route', this.routeChanged);
	},

	routeChanged: function (route) {
		this.forceUpdate();
	},

	componentWillReceiveProps: function (nextProps) {
		this.stopListening(this.props.router);
		this.listenTo(this.nextProps.router, 'route', this.routeChanged);
	}
};