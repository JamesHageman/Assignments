/**
@class Assignment
@extends $resource
@example
function someCtrl($scope, Assignment) {
	//...
}
*/

/**
@member Assignment#title {String}
*/
/**
@member Assignment#description {String}
*/
/**
@member Assignment#dueDate {String}
*/
/**
@member Assignment#_id {String}
*/
/**
@member Assignment#courseId {String}
*/

angular.module('app').factory('Assignment', function ($resource) {
	return $resource('assignments/:id', { id: '@_id' }, {
		/**
		Get array of current user's assignments

		@function Assignment.fetchAll
		@param {Object} options {}
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		@returns {Array.<Assignment>}
			Empty array of assignments (that will be populated when request
			succeeds). Can be bound to $scope.
		*/
		fetchAll: {
			method: 'GET',
			url: 'assignments',
			isArray: true
		},
		/**
		@function Assignment.save
		@param {Assignment} assignment
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		*/
		save: {
			method: 'PUT'
		},
		/**
		Create a new assignment

		@function Assignment.create
		@param {Object|Assignment} options
			can contain initial values for the assignment.
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		*/
		create: {
			method: 'POST',
			url: 'assignments'
		}
	});
});