angular.module('app').directive('navLi', function ($location, $rootScope) {
	var currentRoute;

	$rootScope.$on('$routeChangeSuccess', function () {
		currentRoute = $location.url();
	});

	return {
		scope: {
			route: '@'
		},
		template: '<li><a ng-href="#{{route}}" ng-transclude></a></li>',
		restrict: 'E',
		transclude: true,
		replace: true,
		link: function (scope, elem) {
			scope.$watch(function () {
				if (scope.route == currentRoute) {
					elem.addClass('active');
				} else {
					elem.removeClass('active');
				}
			});
		}
	};
});