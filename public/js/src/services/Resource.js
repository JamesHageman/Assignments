angular.module('app').config(function ($httpProvider) {
	$httpProvider.interceptors.push(function ($rootScope) {
		return {
			request: function (config) {
				if (!config.resourceEvent) return config;

				var eventName = config.resourceEvent;

				$rootScope.$broadcast('request:' + eventName);

				if (config.eventId) {
					var urlArray = config.url.split('/'),
						id = urlArray[urlArray.length - 1];
					eventName += '@' + id;
				}

				$rootScope.$broadcast('request:' + eventName);
				return config;
			},

			response: function (res) {
				if (!res.config.resourceEvent) return res;

				var eventName = res.config.resourceEvent;

				$rootScope.$broadcast('response:' + eventName);

				if (res.config.eventId) {
					var urlArray = res.config.url.split('/'),
						id = urlArray[urlArray.length - 1];
					eventName += '@' + id;
				}

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