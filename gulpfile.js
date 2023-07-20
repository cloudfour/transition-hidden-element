const gulp = require('gulp');
const { rollup } = require('rollup');
const { babel } = require('@rollup/plugin-babel');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const gulpCopy = require('gulp-copy');
const browserSync = require('browser-sync');
const clean = require('gulp-clean');

/**
 * A gulp task to process our javascript.
 *
 * This is a very basic setup. We'll likely want to configure this further.
 */
gulp.task('js', async () => {
  const rollupBuild = await rollup({
    input: 'demo/demo.js',
    plugins: [babel(), nodeResolve()],
  });
  await rollupBuild.write({
    file: 'dist/demo.js',
    format: 'iife',
  });
  await rollupBuild.close();
});

/**
 * A gulp task to copy our other demo files to our dist folder
 */
gulp.task('content', () => {
  return gulp
    .src(['demo/index.html', 'demo/styles.css'])
    .pipe(gulpCopy('dist', { prefix: 1 }));
});

/**
 * Clean out old content
 */
gulp.task('clean', () => {
  return gulp
    .src('dist', {
      allowEmpty: true,
      read: false,
    })
    .pipe(clean());
});

/**
 * Watch for file changes
 */
gulp.task('watch', () => {
  gulp.watch('*(src|demo)/**/*.js', gulp.series('js', 'reload'));
  gulp.watch('demo/**/*.*(html|css)', gulp.series('content', 'reload'));
});

/**
 * Serve files
 */
gulp.task('serve', () => {
  browserSync.init({
    notify: false,
    server: { baseDir: './dist' },
  });
});

/**
 * Serve updated files
 */
gulp.task('reload', (callback) => {
  browserSync.reload();
  callback();
});

/**
 * Start up gulp
 */
gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel('js', 'content'),
    gulp.parallel('serve', 'watch'),
  ),
);
