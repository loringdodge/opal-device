var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
// var uglify = require('gulp-uglify');
// var gulpConcat = require('gulp-concat');
// var clean = require('gulp-clean');
// var async = require('async');
// var runSequence = require('run-sequence').use(gulp);


gulp.runSync = function (tasks, cb) {
  var sync = tasks.map(function (t) {
    if (Array.isArray(t)) {
      return gulp.run.bind.apply(gulp.run, [gulp].concat(t));
    }
    return gulp.run.bind(gulp, t);
  });
  async.series(sync, cb);
  return gulp;
};

gulp.task('sass-demo', function () {
  return gulp.src('./client/demo/*.scss')
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(gulp.dest('./client/demo/'));
});

// gulp.task('js', function () {
//   gulp.src([
//       // Files
//     ])
//     .pipe(gulpConcat('main.js'))
//     // .pipe(uglify()) // Takes a long time
//     .pipe(gulp.dest('./client/dist/'));
// });

gulp.task('watch-demo', ['sass-demo'], function () {
  gulp.watch('./client/demo/**/*.scss', ['sass-demo']);
});

// gulp.task('watch', ['js', 'sass'], function () {
//   gulp.watch('./client/scss/**/*.scss', ['sass']);
//   gulp.watch('./client/**/*.js', ['js']);
// });