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
					'!**/*.exclude.js',
					jsRoot + 'lib/jquery.min.js',
					jsRoot + 'lib/angular.min.js',
					jsRoot + 'lib/*.js',
					jsRoot + 'src/app.js',
					jsRoot + 'src/**/*.js'
				],
				dest: jsRoot + 'dev/bundle.js'
			},
			react: {
				files: {
					'public/react/js/dev/lib.js': [
						'public/react/js/lib/*.js'
					],
					'public/react/js/dev/src.jsx': [
						'public/react/js/src/banner.js',
						'public/react/js/src/*',
						'!public/react/js/src/AppRouter.jsx',
						'public/react/js/src/AppRouter.jsx'
					]
				}
			}
		},
		watch: {
			options: {
				livereload: true
			},
			src: {
				files: [
					jsRoot + 'lib/**/*.js',
					jsRoot + 'src/**/*.js',
					jsRoot + 'src/README.md'
				],
				tasks: ['concat:dev'] // used to be parallel:js
			},
			other: {
				files: [
					'public/templates/**',
					'public/css/**',
					'public/index.html'
				]
			},
			react: {
				files: [
					'public/react/js/src/**',
					'public/react/js/lib/**',
					'public/react/css/**',
					'public/react/index.html'
				],
				tasks: ['concat:react', 'react:dev']
			}
		},
		exec: {
			build_docs: {
				cmd: 'jsdoc ./public/js/src ./public/js/src/README.md ' +
						'-r -d ./public/js/doc/'
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
		},
		parallel: {
			js: {
				options: {
					grunt: true
				},
				tasks: ['concat:dev', 'exec:build_docs']
			}
		},
		react: {
			dev: {
				files: {
					'public/react/js/dev/src.js': 'public/react/js/dev/src.jsx'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-exec');
	grunt.loadNpmTasks('grunt-parallel');
	grunt.loadNpmTasks('grunt-react');

	grunt.registerTask('default', ['concat', 'watch']);
	grunt.registerTask('build', ['concat', 'uglify']);
	grunt.registerTask('docs', ['exec:build_docs']);
	grunt.registerTask('react-dev', ['concat:react', 'react:dev', 'watch:react']);
};