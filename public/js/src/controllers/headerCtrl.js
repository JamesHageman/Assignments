angular.module('app').controller('headerCtrl',
function ($scope, User, $location) {
	$scope.visible = User.loggedIn();

	$scope.$on('login', function () {
		$scope.visible = true;
	});

	$scope.$on('logout', function () {
		$scope.visible = false;
	});

	$scope.handleLogoutButtonClick = function (event) {
		event.preventDefault();
		User.logout({}, function () {
			$location.url('/login');
		});
	};
});