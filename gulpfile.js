// Gulp configuration file
/* global require: true */

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var bower = require('gulp-bower');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var mochaTest = require('gulp-mocha');
var gutil = require('gulp-util');

var istanbul = require('gulp-istanbul');
var spawn = require('child_process').spawn;

// default task.
gulp.task('default', ['browser-sync', 'sass', 'watch']);

// Gulp browser-sync
gulp.task('browser-sync', ['nodemon'], function () {
  'use strict';
  browserSync.init({
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    port: 5000
  });
});

// Gulp nodemon
gulp.task('nodemon', function (cb) {
  'use strict';
  var started = false;

  return nodemon({
    script: 'server.js'
  }).on('start', function () {
    // Callback used to ensure browser-sync does not start before nodemon
    if (!started) {
      cb();
      started = true;
    }
  });
});


// Gulp bower
gulp.task('bower', function () {
  'use strict';
  return bower('./bower_components')
    .pipe(gulp.dest('public/lib'));
});

// Script task
gulp.task('lint', function () {
  'use strict';
  return gulp.src(['public/js/**/*.js', 'test/**/*.js', 'app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

// Gulp sass tasks
gulp.task('sass', function () {
  'use strict';
  return gulp.src('public/css/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(gulp.dest('public/css/'))
    .pipe(browserSync.stream());
});

gulp.task('before-test', function () {
  'use strict';
  return gulp.src(['app/controllers/*.js', 'app/models/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

// Setup mocha and frontend tests
gulp.task('test', ['before-test'], function () {
  'use strict';
  gulp.src([
    'test/user/*.js',
    'test/game/*.js',
    'test/article/*.js',
    'test/api/*.js'
  ], {
    read: false
  })
    .pipe(mochaTest())
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: ['lcov'],
      reportOpts: {
        dir: './coverage'
      }
    }))
    .once('error', gutil.log);

  spawn('node_modules/karma/bin/karma', ['start', '--single-run'], {
    stdio: 'inherit'
  }).on('close', process.exit);
});


// Gulp will watch files for changes
gulp.task('watch', function () {
  'use strict';
  // Watch .css files
  gulp.watch('public/css/**', ['sass']);
  // Watch .jade files
  gulp.watch([
    'public/views/**/*',
    'public/js/**/*',
    'app/views/**'
  ]).on('change', browserSync.reload);
});
