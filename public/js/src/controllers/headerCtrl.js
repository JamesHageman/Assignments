angular.module('app').controller('headerCtrl',
function ($scope, User, $location) {
	$scope.handleLogoutButtonClick = function () {
		alert('logout');
		User.logout({}, function () {
			$location.url('/login');
		});
	};
});