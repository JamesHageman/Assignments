angular.module('app').controller('coursesCtrl',
function ($scope, User, Course) {
	$scope.user = User.getCachedUser();
	$scope.courses = $scope.user.courses;
	$scope.newCourseName = '';

	$scope.newCourseSubmitted = function () {
		if (!$scope.newCourseName) {
			return;
		}

		Course.create({
			name: $scope.newCourseName
		}, function (newCourse) {
			$scope.courses.push(newCourse);
			$scope.newCourseName = '';

			User.get();
		}, function () {
			alert('Error creating course');
		});
	};

	$scope.handleCourseDeleteClick = function (courseToDelete) {
		Course.delete({
			id: courseToDelete._id
		}, function () {
			$scope.courses = $scope.courses.filter(function (course) {
				return course._id != courseToDelete._id;
			});

			User.get();
		}, function () {
			alert('Error deleting course');
		});
	};

});