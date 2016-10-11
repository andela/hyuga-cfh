//Gulp configuration file

var require = require(), process();

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	nodemon = require('gulp-nodemon'),
	bower = require('gulp-bower'),
	sass = require('gulp-ruby-sass'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	mocha = require('gulp-mocha'),
	gutil = require('gulp-util'),
	notify = require('gulp-notify'),
	runSequence = require('run-sequence');


gulp.task('default', function () {
	//Listen for changes with livereload
	runSequence('build', 'watch');

});

gulp.task('build', ['browser-sync'], function () {
	//Listen for changes with livereload
	livereload.listen();

});


// Gulp browser-sync

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        browser: "google-chrome",
        port: 5000,
	});
});


// Gulp nodemon

gulp.task('nodemon', function (cb) {
	
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
	return bower()
		.pipe(gulp.dest('./public/lib'))
});

// Script task

gulp.task('scripts', function() {
  return gulp.src(['gruntfile.js','public/js/**/*.js','test/**/*.js', 'app/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(livereload())
    .pipe(notify({ message: 'Scripts task complete' }))
});

// Gulp sass tasks

gulp.task('sass', function() {
  return gulp.src(['public/css/common.scss, public/css/views/articles.scss'])
    .pipe(sass())
    .pipe(livereload())
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Setup mocha test 

gulp.task('test', function() {
    return gulp.src(['test/**/*.js'], { read: false })
        .pipe(mocha({ reporter: 'spec' }))
        .once('error', () => {
        	gutil.log;
        	process.exit(1);
        })
        .once('end', () => {
        	process.exit();
        })
});


// Gulp will watch files for changes

gulp.task('watch', function() {

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

