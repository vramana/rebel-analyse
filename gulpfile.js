const gulp = require("gulp");
const browserSync = require('browser-sync');
const reload = browserSync.reload;

gulp.task('serve', () => {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    ghostMode: false,
    server: ['src'],
    port: 3000
  });

  gulp.watch(['src/*.html'], reload);
  gulp.watch(['src/styles/**/*.css'], reload);
  gulp.watch(['src/scripts/**/*.js'], reload);
})
