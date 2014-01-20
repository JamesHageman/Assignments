// Top level controller, used to authenticate user at startup

angular.module('app').controller('mainCtrl',
function (User, $location, $timeout, $scope) {
	var url = $location.url();
	$location.replace();
	$location.url('/');

	User.get({}, function () {
		$location.replace();
		$location.url(url);
	}, function () {
		$location.replace();
		$location.url('/login');
	});
});