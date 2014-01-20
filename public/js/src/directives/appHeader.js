angular.module('app').directive('appHeader', function () {
	return {
		restrict: 'A',
		templateUrl: 'templates/header.html',
		link: function (scope, elem) {
			var $nav = elem.find('nav'),
				nav;

			nav = responsiveNav('#nav', {
				customToggle: '#nav-toggle'
			});

			$nav.find('a').on('click', function () {
				nav.toggle();
			});
		}
	};
});