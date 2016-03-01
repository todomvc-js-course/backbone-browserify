var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  return browserify({
      entries: ['client/app.js'],
      debug: false
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('watch', function() {
  gulp.watch('client/**/*.js', ['build']);
});
