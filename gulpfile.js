var jshint = require('gulp-jshint');
var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');
var mocha = require('gulp-mocha');
var sourcemaps = require('gulp-sourcemaps');

//running just "gulp" will run the task named "default" by convention
gulp.task('default', ['javascript', 'css', 'tests', 'browserify']);

gulp.task('javascript', function() {
	return gulp.src('./app/js/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
	return browserify({ entries: './app/js/main.js', debug: true}) //debug creayes sourcemaps
		.transform(babelify, { presets: ['es2015', 'react'] })
		.bundle()
		.pipe(source('./app/js/bundle.js'))
		.pipe(sourcemaps.init({ loadMaps: true })) //load existing sourcemaps
    .pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./app/js'))
});

gulp.task('css', function () {
	return gulp.src('./app/css/*.scss')
		.pipe(concatCss("styles/bundle.scss"))
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./app/css'));
});

gulp.task('tests', function () {
	return gulp.src('./app/js/*.test.js')
		// gulp-mocha needs filepaths so you can't have any plugins before it 
		.pipe(mocha({reporter: 'nyan'}));
});