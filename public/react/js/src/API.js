window.API = (function ($) {
	return {
		assignments: {
			fetchAll: function () {
				var def = $.Deferred();
				$.get('/assignments').done(function (data) {
					setTimeout(function () {
						def.resolve(data);
					}, 500);
				});
				return def.promise();
			},
			get: function (id) {
				var def = $.Deferred();
				$.get('/assignments/' + id).done(function (data) {
					setTimeout(function () {
						def.resolve(data);
					}, 500);
				});
				return def.promise();
			}
		}
	};
})(jQuery);