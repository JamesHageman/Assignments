module.exports = function (grunt) {
	var jsRoot = 'public/js/';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: '\n\n\n;\n\n\n'
			},
			dev: {
				src: [
					jsRoot + 'lib/jquery.min.js',
					jsRoot + 'lib/angular.min.js',
					jsRoot + 'lib/bootstrap.min.js',
					jsRoot + 'lib/*.js',
					jsRoot + 'src/app.js',
					jsRoot + 'src/**/*.js'
				],
				dest: jsRoot + 'dev/bundle.js'
			}
		},
		watch: {
			src: {
				files: [
					jsRoot + 'lib/**/*.js',
					jsRoot + 'src/**/*.js',
					jsRoot + 'src/README.md'
				],
				tasks: ['concat', 'exec:docs']
			}
		},
		exec: {
			docs: {
				cmd: 'jsdoc ./public/js/src ./public/js/src/README.md -r -d ./public/js/doc/'
			}
		},
		uglify: {
			dist: {
				files: {
					'public/js/dist/build.js': [jsRoot + 'dev/bundle.js']
				}
			},
			options: {
				mangle: false,
				report: 'min'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-exec');

	grunt.registerTask('default', ['concat', 'watch']);
	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('docs', ['exec:docs']);
};