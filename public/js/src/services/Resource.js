angular.module('app').config(function ($httpProvider) {
	$httpProvider.interceptors.push(function ($rootScope) {
		return {
			request: function (config) {
				if (!config.resourceEvent) return config;

				var eventName = config.resourceEvent;

				if (config.eventId) {
					var urlArray = config.url.split('/'),
						id = urlArray[urlArray.length - 1];
					eventName += '@' + id;
				}

				console.log('request:' + eventName);
				$rootScope.$broadcast('request:' + eventName);
				return config;
			},

			response: function (res) {
				if (!res.config.resourceEvent) return res;

				var eventName = res.config.resourceEvent;

				if (res.config.eventId) {
					var urlArray = res.config.url.split('/'),
						id = urlArray[urlArray.length - 1];
					eventName += '@' + id;
				}

				console.log('response:' + eventName);
				$rootScope.$broadcast('response:' + eventName);
				return res;
			}
		};
	});
});

angular.module('app').factory('Resource', function ($resource) {
	return function (resourceName, url, paramDefaults, actions) {
		angular.forEach(actions, function (action, actionName) {
			action.resourceEvent = resourceName + '.' + actionName;
			action.eventId = !!action.eventId;
		});

		return $resource(url, paramDefaults, actions);
	};
});