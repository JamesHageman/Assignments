window.API = (function ($) {
	return {
		assignments: {
			fetchAll: function () {
				var def = $.Deferred();
				$.get('/assignments').done(function (data) {
					def.resolve(data);
				});
				return def.promise();
			}
		}
	};
})(jQuery);

window.App = (function ($, React) {
	return {
		init: function () {
			$.post('/users/login', {
				username: 'james',
				password: 123
			}).done(function () {
				AppRouter.init();
			});
		}
	};
})(jQuery, React);

window.AssignmentList = React.createClass({
	getInitialState: function () {
		return {
			assignments: this.props.list
		};
	},
	getDefaultProps: function () {
		return {
			list: []
		};
	},
	render: function () {
		var assignmentList = this.state.assignments.map(function (assignment) {
			return React.DOM.li(null, assignment.title);
		});
		return React.DOM.ul(null, assignmentList);
	}
});

window.NotFoundView = React.createClass({
	render: function () {
		return React.DOM.h3(null, 'Page not found');
	}
});

window.AppRouter = (function (API) {
	var rootNode = document.getElementById('main'),
		assignmentList = AssignmentList();

	return new Router({
		'/': function () {

			React.renderComponent(assignmentList, rootNode);

			API.assignments.fetchAll().done(function (assignments) {
				assignmentList.setState({
					assignments: assignments
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
})(API);



$(function () {
	App.init();
});