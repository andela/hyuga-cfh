//Gulp configuration file


var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	nodemon = require('gulp-nodemon'),
	bower = require('gulp-bower'),
	sass = require('gulp-ruby-sass'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	mochaTest = require('gulp-mocha'),
	gutil = require('gulp-util'),
	notify = require('gulp-notify'),
	runSequence = require('run-sequence');


gulp.task('default', function () {
	"use strict";
	//Listen for changes with livereload
	runSequence('build', 'watch');

});

gulp.task('build', ['browser-sync'], function () {
	"use strict";
	//Listen for changes with livereload
	livereload.listen();

});


// Gulp browser-sync

gulp.task('browser-sync', ['nodemon'], function() {
	"use strict";
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "google-chrome",
        port: 5000,
	});
});


// Gulp nodemon 

gulp.task('nodemon', ['bower'], function (cb) {
	"use strict";
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', function () {
		
		//Callback used to ensure browser-sync does not start before nodemon
		if (!started) {
			cb();
			started = true; 
		} 
	});
});


// Gulp bower

gulp.task('bower', function() {
	"use strict";
	return bower('./bower_components')
		.pipe(gulp.dest('public/lib'));
});

// Script task

gulp.task('scripts', function() {
	"use strict";
  	return gulp.src(['gruntfile.js','public/js/**/*.js','test/**/*.js', 'app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }));
});

// Gulp sass tasks

gulp.task('sass', function() {
	"use strict";	
  	return gulp.src(['public/css/common.scss, public/css/views/articles.scss'])
    .pipe(sass())
    .pipe(livereload())
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Setup mocha test 

gulp.task('test', function() {
	"use strict";
    return gulp.src([
		'test/user/*.js',
		'test/game/*.js',
		'test/article/*.js'
		], { read: false })
        .pipe(mochaTest({ reporter: 'spec' }))
        .once('error', gutil.log)
		.once('end', process.exit);
});


// Gulp will watch files for changes

gulp.task('watch', function() {
	"use strict";

  // Watch .html files
  gulp.watch("public/views/*.html").on('change', browserSync.reload);

  // Watch .scss files
  gulp.watch(['public/css/common.scss, public/css/views/articles.scss'], ['sass']);

  // Watch .css files 
  gulp.watch('public/css/**', ['sass']);

  // Watch .js files
  gulp.watch(['public/js/**/*.js','test/**/*.js', 'app/**/*.js'], ['scripts']);

  // Watch .jade files
  gulp.watch('app/views/**').on('change', browserSync.reload);

});