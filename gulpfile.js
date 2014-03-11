var gulp = require('gulp'),
	concat = require('gulp-concat'),
	react = require('gulp-react'),
	header = require('gulp-header');

gulp.task('scripts:lib', function () {
	gulp.src([
			'public/js/lib/jquery.min.js',
			'public/js/lib/underscore-min.js',
			'public/js/lib/backbone-min.js',
			'public/js/lib/react.min.js'
		])
		.pipe(concat('lib.js'))
		.pipe(gulp.dest('public/js/dev/'));
});

gulp.task('scripts:src', function () {
	gulp.src([
			'public/js/src/**.js',
			'public/js/src/**.jsx',
			'public/js/src/main.jsx'
		])
		.pipe(concat('src.jsx'))
		.pipe(header('/** @jsx React.DOM */\n\n'))
		.pipe(react())
		.pipe(gulp.dest('public/js/dev/'));
});

gulp.task('scripts', ['scripts:lib', 'scripts:src']);

gulp.task('default', ['scripts'], function () {
	gulp.watch('public/js/src/**', ['scripts']);
});