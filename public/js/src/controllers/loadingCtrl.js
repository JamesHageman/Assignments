angular.module('app').controller('loadingCtrl', function ($scope, User, $location) {
	if (User.loggedIn()) {
		$location.replace();
		$location.url('/assignments');
	} else {
		$location.replace();
		$location.url('/login');
	}
});