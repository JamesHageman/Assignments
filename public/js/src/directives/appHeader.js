angular.module('app').directive('appHeader', function () {
	return {
		restrict: 'A',
		templateUrl: 'templates/header.html',
		transclude: true,
		link: function (scope, elem) {
			var smallNav = elem.find('.small-nav'),
				largeNav = elem.find('.large-nav'),
				toggle = elem.find('.nav-toggle');

			smallNav.find('ul').addClass('nav-stacked');
			smallNav.hide();

			toggle.on('click', function () {
				smallNav.slideToggle(150);
			});

			toggle.on('touchend', function (e) {
				smallNav.slideToggle(150);
				e.preventDefault();
				e.stopPropagation();
			});
		}
	};
});