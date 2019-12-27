var gulp = require('gulp');
var rollup = require('gulp-better-rollup');
var babel = require('rollup-plugin-babel');
const nodeResolve = require('@rollup/plugin-node-resolve');

/**
 * A gulp task to process our javascript.
 *
 * This is a very basic setup. We'll likely want to configure this further.
 */
gulp.task('js', () => {
  return gulp
    .src('src/demo.js')
    .pipe(
      rollup(
        {
          plugins: [babel(), nodeResolve()]
        },
        {
          format: 'iife'
        }
      )
    )
    .pipe(gulp.dest('demo'));
});

/**
 * Recompile JS on file changes
 */
gulp.task('watch', () => {
  gulp.watch('src/**/*.js', gulp.series('js'));
});

/**
 * Start up gulp
 */
gulp.task('default', gulp.parallel('js', 'watch'));
