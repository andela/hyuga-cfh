// Gulp configuration file
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const bower = require('gulp-bower');
const sass = require('gulp-ruby-sass');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const mochaTest = require('gulp-mocha');
const gutil = require('gulp-util');
const runSequence = require('run-sequence');
const istanbul = require('gulp-istanbul');
const childProcess = require('child_process');

gulp.task('default', () => {
  runSequence('build', 'watch');
});

gulp.task('build', ['browser-sync'], () => {
  livereload.listen();
});

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    browser: 'google-chrome',
    port: 5000,
  });
});

gulp.task('nodemon', (cb) => {
  let started = false;

  return nodemon({
    script: 'server.js',
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('bower', () => {
  return bower('./bower_components')
    .pipe(gulp.dest('public/lib'));
});

gulp.task('lint', () => {
  gulp.src(['public/js/**/*.js', 'test/**/*.js', 'app/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('sass', () => {
  return gulp.src(['public/css/common.scss, public/css/views/articles.scss'])
    .pipe(sass())
    .pipe(livereload())
    .pipe(browserSync.reload({
      stream: true,
    }));
});

gulp.task('before-test', () => {
  return gulp.src(['app/controllers/*.js', 'app/models/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['before-test'], () => {
  gulp.src([
    'test/user/*.js',
    'test/game/*.js',
    'test/article/*.js',
    'test/api/*.js',
  ], {
    read: false,
  })
    .pipe(mochaTest())
    .pipe(istanbul.writeReports({
      dir: './coverage',
      reporters: ['lcov'],
      reportOpts: {
        dir: './coverage',
      },
    }))
    .once('error', gutil.log);

  childProcess.spawn('node_modules/karma/bin/karma', ['start', '--single-run'], {
    stdio: 'inherit',
  }).on('close', process.exit);
});

gulp.task('watch', () => {
  gulp.watch('public/views/*.html').on('change', browserSync.reload);
  gulp.watch(['public/css/common.scss, public/css/views/articles.scss'], ['sass']);
  gulp.watch('public/css/**', ['sass']);
  gulp.watch(['public/js/**/*.js', 'test/**/*.js', 'app/**/*.js']);
  gulp.watch('app/views/**').on('change', browserSync.reload);
});
