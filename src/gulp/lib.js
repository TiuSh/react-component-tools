let babel = require('gulp-babel');
let del = require('del');

module.exports = function (gulp, config) {
  gulp.task('clean:lib', del.bind(null, config.component.lib));

  gulp.task('build:lib', function () {
    return gulp.src([config.component.src + '/**/*.js', '!**/__tests__/**/*'])
      .pipe(babel())// auto use .babelrc
      .pipe(gulp.dest(config.component.lib));
  });

  gulp.task('watch:lib', ['build:lib'], function () {
    return gulp.watch([config.component.src + '/**/*.js', '!**/__tests__/**/*'], ['build:lib']);
  });
};
