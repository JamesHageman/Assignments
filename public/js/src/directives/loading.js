angular.module('app').directive('loading', function () {
	var link = function (scope, elem) {
		scope.visible = false;
		scope.$on('request:' + scope.eventName, function () {
			scope.visible = true;
		});
		scope.$on('response:' + scope.eventName, function () {
			scope.visible = false;
		});
	};

	return {
		scope: {
			eventName: '@loading'
		},
		template: '<span ng-show="visible"><img src="img/ajax-loader.gif" /></span>',
		replace: true,
		transclude: true,
		compile: function (tElem) {
			return link;
		}
	};
});