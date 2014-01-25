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
function (Resource) {
	var resource = Resource('Course', 'courses/:id', { id: '@_id' }, {
		/**
		Create a new course

		@function Course.create
		@param {Object} options
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		*/
		create: {
			method: 'POST',
			url: 'courses'
		},
		/**
		delete a course

		@function Course.delete
		@param {Object} options
			@param {String} options.id
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		*/
		delete: {
			method: 'DELETE',
			eventId: true
		}
	});

	return resource;
});