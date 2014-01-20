angular.module('app').controller('assignmentCtrl',
function ($scope, Assignment, $routeParams, $location, User) {
	$scope.item = Assignment.get({ id: $routeParams.id }, function () {
		// assignment loaded
		if (!$scope.item.courseId) {
			$scope.item.courseId = 0;
		}
	});

	$scope.user = User.getCachedUser();

	$scope.courses = [
		{
			name: 'None',
			_id: 0
		}
	].concat($scope.user.courses);


	$scope.saveButtonClick = function () {
		$scope.item.$save();
		$location.url('/assignments');
	};
});