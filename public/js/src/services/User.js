/**
User service for getting user info, logging in / out, etc.

@class User
@extends $resource
@example
function someCtrl($scope, User) {
	//...
}

*/


/**
@member User#email {String}
*/

/**
@member User#username {String}
*/

/**
@member User#_id {String}
*/

/**
@member User#courses {Array.<Course>}
*/

angular.module('app').factory('User', function (Resource, $rootScope) {
	var _loggedIn = false,
		_cachedUser = null,
		loginInterceptor = {
			response: function (res) {
				_loggedIn = true;
				_cachedUser = res.data;
				$rootScope.$broadcast('login');
				return res;
			},
			responseError: function () {
				_loggedIn = false;
				_cachedUser = null;
				$rootScope.$broadcast('logout');
			}
		};

	var resource = Resource('User', 'users', {}, {
		/**
		Log in by passing username and password

		@function User.login
		@param {Object} options
			@param {String} options.username
			@param {String} options.password
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		*/
		login: {
			url: 'users/login',
			method: 'POST',
			interceptor: loginInterceptor
		},

		/**
		Log out

		@function User.logout
		@param {Object} options {} Empty object (may be used for special options
									later on)
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		*/
		logout: {
			url: 'users/logout',
			method: 'POST',
			interceptor: {
				response: function () {
					_loggedIn = false;
					$rootScope.$broadcast('logout');
				}
			}
		},

		/**
		Get the current logged in user

		@function User.get
		@param {Object} options Login options (usually empty)
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error

		@example
		User.get({}, function (user) {
			$scope.user = user;
		});
		*/
		get: {
			url: 'users/me',
			method: 'GET',
			interceptor: loginInterceptor
		},

		/**
		Create a new user

		@function User.create
		@param {Object} options User info (username, password, email)
		@param {$resource~successCallback} success
		@param {$resource~errorCallback} error
		*/
		create: {
			method: 'POST',
			interceptor: loginInterceptor
		}
	});

	// return the $resource with some other functions
	// added to it
	return angular.extend(resource, {
		/**
		@function User.loggedIn
		@returns {bool}
		*/
		loggedIn: function () {
			return _loggedIn;
		},

		/**
		Used to synchronously get the current logged in user.
		The returned user is read-only - changing it will not change the cached
		user.

		@function User.getCachedUser
		@returns {User}
		*/
		getCachedUser: function () {
			// returns a read-only user object synchronously
			// use only after session start / login
			return angular.copy(_cachedUser);
		}
	});
});