angular.module('app').directive('appHeader', function () {
	return {
		restrict: 'A',
		templateUrl: 'templates/header.html',
		transclude: true,
		scope: true,
		link: function (scope, elem) {
			var smallNav = elem.find('.small-nav'),
				largeNav = elem.find('.large-nav'),
				toggle = elem.find('.nav-toggle');

			smallNav.find('ul').addClass('nav-stacked');
			smallNav.click('a', function () {
				smallNav.addClass('closed');
			});

			toggle.on('click', function () {
				smallNav.toggleClass('closed');
			});

			toggle.on('touchend', function (e) {
				smallNav.toggleClass('closed');
				e.preventDefault();
				e.stopPropagation();
			});
		}
	};
});