angular.module('app').controller('headerCtrl', 
function ($scope, User, $location) {
	$scope.handleLogoutButtonClick = function () {
		User.logout({}, function () {
			$location.url('/login');
		});
	};
});