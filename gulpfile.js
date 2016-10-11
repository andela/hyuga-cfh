//Gulp configuration file

var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	nodemon = require('gulp-nodemon');


gulp.task('default', ['browser-sync'], function () {
});


// Gulp browser-sync

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
        files: ["public/**/*.*"],
        browser: "google chrome",
        port: 3001,
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