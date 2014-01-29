angular.module('app').directive('appNav', function () {
	return {
		restrict: 'A',
		templateUrl: 'templates/appnav.html',
		transclude: true,
		scope: true,
		link: function (scope, elem) {
			var smallNav = elem.find('.app-nav-mobile'),
				largeNav = elem.find('.large-nav'),
				toggle = elem.find('.nav-toggle');

			smallNav.find('ul').addClass('nav-stacked');
			smallNav.click('a', function () {
				smallNav.addClass('closed');
			});

			toggle.on('click', function () {
				smallNav.toggleClass('closed');
				this.blur();
			});

			toggle.on('touchend', function (e) {
				smallNav.toggleClass('closed');
				e.preventDefault();
				e.stopPropagation();
				this.blur();
			});
		}
	};
});