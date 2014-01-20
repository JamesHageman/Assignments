angular.module('app').controller('assignmentsCtrl',
function ($scope, Assignment, User, $location) {
	$scope.assignments = [];

	if (User.loggedIn()) {
		$scope.assignments = Assignment.fetchAll({},
		function() {

		}, function (error) {
			console.log(error);
		});
	} else {
		$location.replace();
		$location.url('/login');
	}

	$scope.handleNewButtonClick = function () {
		Assignment.create({}, function (item) {
			$location.url('/assignment/' + item._id);
		}, function (error) {
			alert('Error creating assignment: ' + error);
		});
	};

	$scope.handleAssignmentDeleteClick = function (item, e) {
		e.stopPropagation();
		item.$delete({}, function (deletedItem) {
			var filteredArray = $scope.assignments.filter(function (item) {
				return item._id != deletedItem._id;
			});

			$scope.assignments = filteredArray;
		}, function () {
			alert('error deleting');
		});
	};

	$scope.handleAssignmentClick = function (item) {
		$location.url('/assignment/' + item._id);
	};

});