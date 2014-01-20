angular.module('app').controller('loginCtrl',
function ($scope, User, $location) {
	$scope.username = '';
	$scope.password = '';
	$scope.showErrorMessage = false;

	$scope.loginFormSubmit = function () {
		User.login({
			username: $scope.username,
			password: $scope.password
		}, function () {
			$scope.showErrorMessage = false;
			$location.replace();
			$location.url('/assignments');
		}, function (error) {
			$scope.showErrorMessage = true;
			$scope.password = '';
		});
	};

	$scope.handleCreateAccountClick = function () {
		$location.url('/createaccount');
	};

	if (User.loggedIn()) {
		$location.replace();
		$location.url('/assignments');
	}
});