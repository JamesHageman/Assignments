/**
TODO

@class Course

@example
function someCtrl($scope, Course) {
	//...
}
*/

/**
@member Course#name {String}
*/
/**
@member Course#_id {String}
*/

angular.module('app').factory('Course',
function ($resource) {
	var resource = $resource('courses/:id', { id: '@_id' }, {
		/**
		Create a new course

		@function Course.create
		@param {Object} options
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		*/
		create: {
			method: 'POST'
		}
	});

	return resource;
});