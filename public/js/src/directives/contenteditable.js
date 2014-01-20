angular.module('app').directive('contenteditable', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, elem, attrs, ngModel) {
			ngModel.$render = function () {
				elem.html(ngModel.$viewValue);
			};

			elem.on('change keyup blur', function () {
				scope.$apply(function () {
					var text = elem.html();
					ngModel.$setViewValue(text);
				});
			});
		}
	};
});