angular.module('app').controller('createAccountCtrl', function ($scope, User) {
	$scope.username = '';
	$scope.password = '';
	$scope.confirmPassword = '';
	$scope.email = '';

	$scope.handleCreateAccountClick = function () {
		User.create({
			username: $scope.username,
			password: $scope.password,
			email: $scope.email
		});
	};
});