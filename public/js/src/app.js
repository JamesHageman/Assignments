angular.module('app', ['ngRoute', 'ngResource', 'ngAnimate'])
.config(function ($routeProvider) {
	$routeProvider
		.when('/assignments', {
			templateUrl: 'templates/assignments.html'
		})
		.when('/assignment/:id', {
			templateUrl: 'templates/assignment.html'
		})
		.when('/login', {
			templateUrl: 'templates/login.html'
		})
		.when('/', {
			templateUrl: 'templates/loading.html'
		})
		.when('/createaccount', {
			templateUrl: 'templates/createaccount.html'
		})
		.when('/courses', {
			templateUrl: 'templates/courses.html'
		})
		.otherwise({
			redirectTo: '/'
		});
})
.run(function ($rootScope, $location, User) {
	$rootScope.$on('$routeChangeStart', function () {
		if (!User.loggedIn()) {
			$location.url('/login');
		}
	});
});