var gulp = require('gulp');
var browserify = require('browserify');
var jstify = require('jstify');
var source = require('vinyl-source-stream');

gulp.task('js', function() {
  return browserify({
      entries: ['app/app.js'],
      debug: false
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', function() {
  gulp.watch('app/**/*.js', ['js']);
});
